const TodoFetcher = require('../src/request/request');
const axios=require('axios');
// Mocking Axios
jest.mock('axios');

describe('TodoFetcher', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('fetchTodos returns an array of length 20 with valid response', async () => {
        const mockResponse = { data: { title: 'Mock title', completed: false } };
        axios.get.mockResolvedValue(mockResponse);

        const todoFetcher = new TodoFetcher();
        const todos = await todoFetcher.getTodo();
        expect(Array.isArray(todos)).toBe(true);
        expect(todos.length).toBe(20);
        todos.forEach(todo => {
            expect(todo).toHaveProperty('title');
            expect(todo).toHaveProperty('completed');
        });
    });
    test('each todo has title and completed properties', async () => {
        const mockResponse = {
            data: { title: 'Mock title', completed: false }
        };
        axios.get.mockResolvedValue(mockResponse);

        const todoFetcher = new TodoFetcher();
        const todos = await todoFetcher.getTodo();
        todos.forEach(todo => {
            expect(todo).toHaveProperty('title');
            expect(todo).toHaveProperty('completed');
        });
    });
    test('fetchTodos throws error with invalid response', async () => {
        const errorMessage = 'Network Error';
        axios.get.mockRejectedValue(new Error(errorMessage));

        const todoFetcher = new TodoFetcher();
        await expect(todoFetcher.getTodo()).rejects.toThrow('Error fetching TODOs: ' + errorMessage);
    });

    test('fetchTodos returns an empty array when no response data is provided', async () => {
        const mockResponse = { data: null };
        axios.get.mockResolvedValue(mockResponse);

        const todoFetcher = new TodoFetcher();
        const todos = await todoFetcher.getTodo();
        expect(Array.isArray(todos)).toBe(true);
        expect(todos.length).toBe(0);
    });
});