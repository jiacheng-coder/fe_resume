type project = {
  name: string;
  job: string;
  time: string;
  introduce: string
  myContribution: Array<string> // 需求是什么？我做了什么从而解决了这个问题？
  skills: string;
  more?: string;
};
type projects = {
  company: string;
  /** Public URL under `public/`, e.g. `/icons/meituan.svg` */
  icon?: string;
  projects: Array<project>;
};
export type { project, projects };
