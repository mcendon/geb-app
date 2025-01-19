export interface User {
  id: number;
  name: string;
  planetId: number;
  profiles: string[];
  email: string;
  password?: string;
}
