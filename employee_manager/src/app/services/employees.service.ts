import { Injectable } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment.development';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  newEmployeeId: BehaviorSubject<string> = new BehaviorSubject<string>('');

  setNewEmployeeId(id: string): void {
    this.newEmployeeId.next(id);
  }

  getSkills(): Observable<string[]> {
    return this.http.get<string[]>(environment.skillsUrl);
  }

  getProjects(): Observable<string[]> {
    return this.http.get<string[]>(environment.projectsUrl);
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
