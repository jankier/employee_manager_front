import { Injectable } from '@angular/core';
import { Employee } from '../../../../models/employee.model';
import { EMPLOYEES } from '../../../../mocks/employees.mock';
import { Observable, of } from 'rxjs';
import { MessageService } from '../../../services/message.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private messageService: MessageService) {}

  getEmployees(): Observable<Employee[]> {
    this.messageService.add('fetch');
    return of(EMPLOYEES);
  }
}
