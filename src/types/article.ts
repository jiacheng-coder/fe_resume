import { InjectionKey } from "vue"
export type articleInfo = {
    title: string,
    content: string
}
export const InjectionKeyArticleInfo: InjectionKey<articleInfo> = Symbol()