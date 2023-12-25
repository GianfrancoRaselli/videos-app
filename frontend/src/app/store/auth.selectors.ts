import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

const getAuthState = createFeatureSelector<AuthState>('auth');

export const getAuthUser = createSelector(getAuthState, (state: AuthState) => state.authUser);
