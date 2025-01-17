export interface User {
  id: number;
  name: string;
  planetId: number;
  profiles: string[];
  email: string;
  preferredMode: 'dark' | 'light';
  password: string;
}
