import { Injectable } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment.development';
import { SkillProject } from '../../models/skill-project.model';
import { Project } from '../../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private http: HttpClient) {}

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

  updateEmployee(id: string | null, employee: Employee): Observable<object> {
    return this.http.put<object>(`${environment.employeesUrl}/${id}`, employee);
  }

  updatePassword(id: string | undefined, currentPassword: string, newPassword: string): Observable<any> {
    return this.http.put(`${environment.passwordUrl}/${id}`, { currentPassword, newPassword });
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(environment.employeesUrl, employee);
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this.http.delete<Employee>(`${environment.employeesUrl}/${id}`);
  }
}
