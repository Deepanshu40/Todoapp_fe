// src/api.ts
import axios from 'axios';

const BASE_URL = 'https://0b0f-103-129-194-41.ngrok-free.app';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Response Interceptor for handling response shape
api.interceptors.response.use(
  (response) => {
    return response.data?.data || response.data;
  },
  (error) => {
    console.error('API Error:', error?.response?.data || error.message);
  }
);

// 🔁 Now cleaner API calls
export const getTodos = async () => {
    const data = await api.get('/todos')
    return data.map((todo: any) => {
        return { id: todo._id, title: todo.title };
    })
};
export const addTodo = (title: string) => api.post('/todos', { title });
export const updateTodo = (id: string, title: string) => api.patch(`/todos/${id}`, { title });
export const deleteTodo = (id: string) => api.delete(`/todos/${id}`);
