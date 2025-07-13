export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface User {
  email: string;
  name: string;
}

export interface ScheduleRequest {
  exams: string;
  deadlines: string;
  preferences: string;
}

export interface DoubtRequest {
  subject: string;
  question: string;
}

export interface JournalRequest {
  mood: string;
  entry: string;
}

export interface CampusRequest {
  question: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}