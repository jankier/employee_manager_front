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

  setNewEmployeeId(id: string) {
    this.newEmployeeId.next(id);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(environment.apiUrl);
  }

  getEmployee(id: string | null): Observable<Employee> {
    return this.http.get<Employee>(`${environment.apiUrl}/${id}`);
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(environment.apiUrl, employee, this.httpOptions);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(environment.apiUrl, employee, this.httpOptions);
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this.http.delete<Employee>(`${environment.apiUrl}/${id}`, this.httpOptions);
  }
}
