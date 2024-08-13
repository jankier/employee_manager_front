import { TestBed } from '@angular/core/testing';
import { TextTransformService } from './text-transform.service';

describe('TextTransformService', (): void => {
  let service: TextTransformService;

  beforeEach((): void => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextTransformService);
  });

  it('should be created', (): void => {
    expect(service).toBeTruthy();
  });

  it('should transform text to lowercase', (): void => {
    const input: string = 'John Doe';
    const output: string = 'john doe';
    expect(service.toLowerCase(input)).toBe(output);
  });

  it('should handle empty string in lowercase', (): void => {
    const input: string = '';
    const output: string = '';
    expect(service.toLowerCase(input)).toBe(output);
  });

  it('should handle mixed string in lowercase', (): void => {
    const input: string = 'JoHn DoE';
    const output: string = 'john doe';
    expect(service.toLowerCase(input)).toBe(output);
  });

  it('should transform text to uppercase', (): void => {
    const input: string = 'John Doe';
    const output: string = 'JOHN DOE';
    expect(service.toUpperCase(input)).toBe(output);
  });

  it('should handle empty string in uppercase', (): void => {
    const input: string = '';
    const output: string = '';
    expect(service.toUpperCase(input)).toBe(output);
  });

  it('should handle mixed string in uppercase', (): void => {
    const input: string = 'JoHn DoE';
    const output: string = 'JOHN DOE';
    expect(service.toUpperCase(input)).toBe(output);
  });
});
