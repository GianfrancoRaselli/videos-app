import { User } from '../models/User';

export interface AuthState {
  accessToken: string;
  authUser: User | null;
}

export const initialState: AuthState = {
  accessToken: '',
  authUser: null,
};
