import { Injectable } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment.development';
import { SkillProject } from '../../models/skill-project.model';
import { Project } from '../../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getSkills(): Observable<SkillProject[]> {
    return this.http.get<SkillProject[]>(environment.skillsUrl);
  }

  getProjects(): Observable<SkillProject[]> {
    return this.http.get<SkillProject[]>(environment.projectsUrl);
  }

  getProject(id: string | null): Observable<Project> {
    return this.http.get<Project>(`${environment.projectsUrl}/${id}`);
  }

  getManagers(id: string | null): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.managersUrl}/${id}`);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(environment.employeesUrl);
  }

  getEmployee(id: string | null): Observable<Employee> {
    return this.http.get<Employee>(`${environment.employeesUrl}/${id}`);
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(environment.employeesUrl, employee, this.httpOptions);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(environment.employeesUrl, employee, this.httpOptions);
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this.http.delete<Employee>(`${environment.employeesUrl}/${id}`, this.httpOptions);
  }
}
