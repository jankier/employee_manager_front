import { ProjectsData } from '../models/projects.model';
import { Projects } from '../enums/projects.enum';

export const PROJECTS: ProjectsData[] = [
  {
    name: Projects.PZU,
    description:
      'PZU Group is one of the largest financial institutions in Poland and in Central and Eastern Europe. The Group is led by Powszechny Zakład Ubezpieczeń S.A. (PZU) – a company quoted on the Warsaw Stock Exchange.',
  },
  {
    name: Projects.ORLEN,
    description:
      'Polish multinational oil refiner, petrol retailer and natural gas trader headquartered in Płock, Poland.',
  },
  {
    name: Projects.ALIORBANK,
    description:
      "Alior Bank SA is a universal bank that offers a range of financial services to both individual and business customers. The bank's main activities involve combining traditional banking principles with innovative solutions, thereby contributing to the development of the Polish banking sector.",
  },
  {
    name: Projects.SANTANDER,
    description:
      'Banco Santander is a leading commercial bank, founded in 1857 and headquartered in Spain. It has a meaningful presence in 10 core markets in the Europe, North America and South America regions, and is one of the largest banks in the world by market capitalization.',
  },
  {
    name: Projects.LOT,
    description:
      'LOT Polish Airlines is a modern airline connecting New Europe with the world. It provides almost 9 million passengers a year with the shortest and most comfortable travel options to more than 100 destinations worldwide via Warsaw, a competitive hub offering fast connections.',
  },
  {
    name: Projects.PGNIG,
    description:
      "PGNiG's core business consists in the production and sale of natural gas and crude oil. Both domestically and abroad, we are engaged in geophysical and geological research, exploration for and production of hydrocarbons, as well as preparation of products for sale.",
  },
];
