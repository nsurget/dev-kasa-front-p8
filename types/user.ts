export interface User {
  id: number;
  name: string;
  email: string;
  picture: string;
  role: 'owner' | 'tenant' | string;
}

export interface DecodedToken {
  exp: number;
  sub: string;
  email: string;
  name?: string;
}
