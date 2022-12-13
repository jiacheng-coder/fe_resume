type project = {
  name: string;
  job: string;
  time: string;
  highlight: string;
  situation: string;
  target: string;
  action: string;
  result: string;
  skills: string;
};
type projects = {
  company: string;
  projects: Array<project>;
};
export type { project, projects };
