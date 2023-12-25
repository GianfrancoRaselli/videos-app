import { createAction, props } from '@ngrx/store';
import { User } from '../models/User';

export const setAuthData = createAction('[Auth] Set Auth Data', props<{ accessToken: string; authUser: User }>());
export const clearAuthData = createAction('[Auth] Clear Auth Data');
