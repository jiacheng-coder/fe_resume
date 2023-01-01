import type { articleInfo } from "../types/article"

function apiPost(id: any, status: boolean) {
    let info:articleInfo = {
        title: id,
        content: 'lrmsdfdsaf'
    }
    return new Promise((resolve: (value:articleInfo)=>void, reject)=>{
        if (status) {
            reject('请求失败')
        }else {
            setTimeout(() => {
                resolve(info)
            }, 1000)
        }
    })
}
export {
    apiPost
}