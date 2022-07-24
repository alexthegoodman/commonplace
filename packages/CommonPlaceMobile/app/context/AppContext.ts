import React, {useState, useReducer} from 'react';

export interface AppContextState {
  token: string;
}

export const AppContextState = {
  token: '',
};

export const AppContextReducer = (state: AppContextState, action: any) => {
  switch (action.type) {
    // case value:
    //   break;

    default:
      return {
        ...state,
        [action.type]: action.payload,
      };
      break;
  }
};

export const AppContext = React.createContext<{
  state: AppContextState;
  dispatch: React.Dispatch<any>;
}>({
  state: AppContextState,
  dispatch: () => undefined,
});
