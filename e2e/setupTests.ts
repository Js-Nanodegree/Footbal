import { setupServer } from 'msw/node';
import { handlers } from './mocks';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close()); 