export interface Manager {
  id: string;
  name: string;
  surname: string;
  manager: {
    id: string;
    name: string;
    surname: string;
  };
}
