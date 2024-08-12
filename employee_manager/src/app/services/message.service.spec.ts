import { TestBed } from '@angular/core/testing';
import { MessageService } from './message.service';

describe('MessageService', (): void => {
  let service: MessageService;

  beforeEach((): void => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageService);
  });

  it('should be created', (): void => {
    expect(service).toBeTruthy();
  });

  it('should send message', (): void => {
    const spy = spyOn(service, 'add');
    const message: string = 'Fetched all employees';
    service.add(message);
    expect(spy).toHaveBeenCalledWith(message);
  });

  it('should add message', (): void => {
    const message: string = 'Fetched all employees';
    service.add(message);
    const length: number = 1;
    expect(service.messages).toHaveSize(length);
  });

  it('should clear message', (): void => {
    const spyClear = spyOn(service, 'clear');
    const message: string = 'Fetched all employees';
    service.add(message);
    service.clear();
    expect(spyClear).toHaveBeenCalled();
  });

  it('should delete all messages', (): void => {
    const message: string = 'Fetched all employees';
    service.add(message);
    service.clear();
    const length: number = 0;
    expect(service.messages).toHaveSize(length);
  });
});
