import { TestBed } from '@angular/core/testing';
import { EmployeesService } from './employees.service';
import { provideHttpClient } from '@angular/common/http';

describe('EmployeesService', (): void => {
  let service: EmployeesService;

  beforeEach((): void => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeesService);
  });

  it('should be created', (): void => {
    expect(service).toBeTruthy();
  });
});
