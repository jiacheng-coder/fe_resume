type project = {
  name: string;
  job: string;
  time: string;
  introduce: string
  myContribution: Array<string> // 需求是什么？我做了什么从而解决了这个问题？
  // situation: string;
  // target: string;
  // action: string;
  // result: string;
  skills: string;
  more: string
};
type projects = {
  company: string;
  projects: Array<project>;
};
export type { project, projects };
