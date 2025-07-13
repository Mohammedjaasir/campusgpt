import axios from 'axios';
import { LoginCredentials, RegisterCredentials, ScheduleRequest, DoubtRequest, JournalRequest, CampusRequest } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post('/login', credentials);
    return response.data;
  },

  register: async (credentials: RegisterCredentials) => {
    const response = await api.post('/register', credentials);
    return response.data;
  },
};

export const aiService = {
  generateSchedule: async (data: ScheduleRequest) => {
    const response = await api.post('/schedule', data);
    return response.data;
  },

  solveDoubt: async (data: DoubtRequest) => {
    const response = await api.post('/doubt', data);
    return response.data;
  },

  analyzeJournal: async (data: JournalRequest) => {
    const response = await api.post('/journal', data);
    return response.data;
  },

  askCampusQuestion: async (data: CampusRequest) => {
    const response = await api.post('/campus', data);
    return response.data;
  },
};