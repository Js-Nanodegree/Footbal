export class ErrorHandler {
  static async handle<T>(fn: () => Promise<T>, fallback: () => T): Promise<T> {
    try {
      return await fn();
    } catch (e) {
      // TODO: логирование, интеграция с Sentry
      return fallback();
    }
  }
} 