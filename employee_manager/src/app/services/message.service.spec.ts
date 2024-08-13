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

  it('should send message to empty', (): void => {
    const spy = spyOn(service, 'add');
    const message: string = 'Fetched all employees';
    service.add(message);
    expect(spy).toHaveBeenCalledWith(message);
  });

  it('should add message to empty', (): void => {
    const message: string = 'Fetched all employees';
    service.add(message);
    const length: number = 1;
    expect(service.messages).toHaveSize(length);
  });

  it('should send message to existing', (): void => {
    service.messages = ['Added new employee of id=11', 'Deleted employee of id=10', 'Fetched random employees'];
    const spy = spyOn(service, 'add');
    const message: string = 'Fetched all employees';
    service.add(message);
    expect(spy).toHaveBeenCalledWith(message);
  });

  it('should add message to existing', (): void => {
    service.messages = ['Added new employee of id=11', 'Deleted employee of id=10', 'Fetched random employees'];
    const message: string = 'Fetched all employees';
    service.add(message);
    const length: number = 4;
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
