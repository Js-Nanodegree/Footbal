import { ErrorHandler } from './ErrorHandler';

describe('ErrorHandler', () => {
  it('handle: возвращает результат fn, если нет ошибки', async () => {
    const fn = async () => 42;
    const fallback = () => 0;
    const result = await ErrorHandler.handle(fn, fallback);
    expect(result).toBe(42);
  });

  it('handle: возвращает fallback при ошибке', async () => {
    const fn = async () => { throw new Error('fail'); };
    const fallback = () => 123;
    const result = await ErrorHandler.handle(fn, fallback);
    expect(result).toBe(123);
  });

  it('handle: fallback может быть функцией с побочными эффектами', async () => {
    let called = false;
    const fn = async () => { throw new Error('fail'); };
    const fallback = () => { called = true; return 7; };
    const result = await ErrorHandler.handle(fn, fallback);
    expect(result).toBe(7);
    expect(called).toBe(true);
  });
}); 