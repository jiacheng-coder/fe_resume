process.stdin.resume()
process.stdin.setEncoding('utf-8')
let input = ''
process.stdin.on('data', data => {
  input += data
})
process.stdin.on('end', () => {
  let inputArray = input.split('\n')
  /**
   * 待实现函数，在此函数中填入答题代码
   * doFunc()
   */
  const [timesStr, priceStr] = inputArray
  const times = timesStr.split(' ').map(Number)
  const prices = priceStr.split(' ').map(Number)
  const doFunc = (times, prices) => {
    const result = []
    let tempArr = []
    let i = 0
    while (i < times.length) {
      tempArr.push(times[i])
      let j = i + 1
      while (j < times.length && times[j] - times[i] + 1 <= 30) {
        tempArr.push(times[j])
        j++
      }
      result.push(tempArr)
      tempArr = []
      i = j
    }
    console.log(result)
    let resultMoney = []
    for (let item of result) {
      if (item.length === 1) {
        resultMoney.push(prices[0])
      }
      if (item.length >= 2 && item.length <= 7) {
        resultMoney.push(prices[0])
      }
      if (item.length >= 8 && item.length <= 30) {
        resultMoney.push(prices[0])
      }
    }
    console.log(resultMoney)
  }
  doFunc(times, prices)
  process.exit()
})
