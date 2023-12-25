import { Model } from './models';

export interface User extends Model {
  username: string;
  password: string;
  fullname: string;
}
