import { SkillProject } from './skill-project.model';
import { Manager } from './manager.model';

export interface Employee {
  id: string;
  name: string;
  surname: string;
  employmentDate: string;
  skills: SkillProject[];
  projects: SkillProject[];
  manager: Manager;
}
