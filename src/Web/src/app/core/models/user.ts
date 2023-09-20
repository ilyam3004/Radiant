export interface UserClaim{
  type: string;
  value: string;
}

export interface AuthResponse {
  email: string;
  username: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
}

export interface UserClaim {
  type: string;
  value: string;
}
