export interface User {
  id?: number;
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  phone?: string;
  instagramAccount?: string;
  xAccount?: string;
  youtubeAccount?: string;
  linkedinAccount?: string;
  website?: string;
  emailSup?: string[];
  joinedDate?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  user: User;
}
