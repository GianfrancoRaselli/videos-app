import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { AuthState } from './auth.state';

export function localStorageMetaReducer(reducer: ActionReducer<AuthState>): ActionReducer<AuthState> {
  return (state, action) => {
    const newState = reducer(state, action);
    if ([INIT.toString(), UPDATE.toString()].includes(action.type)) {
      const savedState = localStorage.getItem('ngrx_state');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        return { ...newState, ...parsedState };
      }
    }
    localStorage.setItem('ngrx_state', JSON.stringify(newState));
    return newState;
  };
}
