import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Skills } from '../../enums/skills.enum';
import { Projects } from '../../enums/projects.enum';
import { Employee } from '../../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(): { employees: Employee[]; skills: string[]; projects: string[] } {
    return {
      employees: [
        {
          id: '1',
          name: 'John',
          surname: 'Doe',
          employmentDate: '2020-02-10',
          skills: [Skills.TYPESCRIPT, Skills.JAVA, Skills.ANGULAR],
          projects: [Projects.PZU, Projects.ORLEN],
          manager: 'Will Smith',
        },
        {
          id: '2',
          name: 'Will',
          surname: 'Smith',
          employmentDate: '2021-03-08',
          skills: [Skills.FIGMA, Skills.REACT, Skills.NODE],
          projects: [Projects.ALIORBANK, Projects.PZU],
          manager: 'Derek Blackwood',
        },
        {
          id: '3',
          name: 'Angela',
          surname: 'White',
          employmentDate: '2024-01-11',
          skills: [Skills.DOCKER, Skills.JAVA, Skills.SPRINGBOOT],
          projects: [Projects.SANTANDER, Projects.ALIORBANK],
          manager: 'Will Smith',
        },
        {
          id: '4',
          name: 'Derek',
          surname: 'Blackwood',
          employmentDate: '2018-10-26',
          skills: [Skills.TYPESCRIPT, Skills.REACT, Skills.ANGULAR],
          projects: [Projects.ORLEN, Projects.SANTANDER],
          manager: '',
        },
        {
          id: '5',
          name: 'Nathan',
          surname: 'Hawthorne',
          employmentDate: '2019-06-17',
          skills: [Skills.TYPESCRIPT, Skills.HTML, Skills.CSS],
          projects: [Projects.LOT, Projects.PGNIG],
          manager: 'Derek Blackwood',
        },
        {
          id: '6',
          name: 'Sophia',
          surname: 'Reynolds',
          employmentDate: '2022-09-29',
          skills: [Skills.PHP, Skills.LARAVEL, Skills.SYMFONY],
          projects: [Projects.LOT, Projects.PGNIG],
          manager: 'Will Smith',
        },
        {
          id: '7',
          name: 'Maxwell',
          surname: 'Sanchez',
          employmentDate: '2021-04-15',
          skills: [Skills.MYSQL, Skills.JAVA, Skills.SPRINGBOOT],
          projects: [Projects.ALIORBANK, Projects.ORLEN],
          manager: 'Derek Blackwood',
        },
        {
          id: '8',
          name: 'Ava',
          surname: 'Harper',
          employmentDate: '2023-11-12',
          skills: [Skills.TYPESCRIPT, Skills.JAVA, Skills.AWS],
          projects: [Projects.SANTANDER, Projects.PGNIG],
          manager: 'Will Smith',
        },
        {
          id: '9',
          name: 'Robert',
          surname: 'Hardy',
          employmentDate: '2020-03-17',
          skills: [Skills.REST, Skills.MYSQL, Skills.JAVA],
          projects: [Projects.LOT, Projects.ORLEN],
          manager: 'Will Smith',
        },
        {
          id: '10',
          name: 'James',
          surname: 'Newman',
          employmentDate: '2019-07-14',
          skills: [Skills.TYPESCRIPT, Skills.ANGULAR, Skills.BOOTSTRAP],
          projects: [Projects.LOT, Projects.PZU],
          manager: 'Derek Blackwood',
        },
      ],
      skills: [
        'TypeScript',
        'Java',
        'Figma',
        'Angular',
        'React.js',
        'Node.js',
        'Docker',
        'Spring boot',
        'HTML',
        'CSS',
        'PHP',
        'Laravel',
        'Symfony',
        'MySQL',
        'AWS',
        'REST',
        'Bootstrap',
      ],
      projects: ['PZU', 'Orlen', 'Aliorbank', 'Santander bank', 'LOT', 'PGNiG'],
    };
  }
}
