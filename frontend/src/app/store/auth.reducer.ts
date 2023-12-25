import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { type AuthState, initialState } from './auth.state';
import { localStorageMetaReducer } from './auth.meta-reducer';

export const authReducer = createReducer(
  initialState,
  on(AuthActions.setAuthData, (state, { accessToken, authUser }) => ({ ...state, accessToken, authUser })),
  on(AuthActions.clearAuthData, () => initialState),
);

export function localStorageAwareReducer(state: AuthState | undefined, action: any) {
  return localStorageMetaReducer(authReducer)(state, action);
}
