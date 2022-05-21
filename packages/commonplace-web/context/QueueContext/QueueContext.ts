import React, { useState, useReducer } from "react";

export interface QueueContextState {
  selectedInterest: number;
}

export const QueueContextState = {
  selectedInterest: 0, // 0 means default / all interests
};

export const QueueContextReducer = (state: QueueContextState, action: any) => {
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

export const QueueContext = React.createContext<{
  state: QueueContextState;
  dispatch: React.Dispatch<any>;
}>({
  state: QueueContextState,
  dispatch: () => undefined,
});
