/**
 * 将 public 目录下的相对路径或绝对路径解析为完整的资源 URL。
 * 支持 http/https 开头的绝对 URL 直接透传。
 */
export function publicAssetUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const base = import.meta.env.BASE_URL
  const rel = path.startsWith('/') ? path.slice(1) : path
  return `${base}${rel}`
}
