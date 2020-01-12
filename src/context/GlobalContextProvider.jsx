import React, { useReducer } from 'react';

export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()

export const NAVIGATE_PAGE = "NAVIGATE_PAGE"

const initialState = {
  navIdx: 0,
  isMovingDown: true
}

function reducer(state, action){
  switch(action.type){
    case NAVIGATE_PAGE:{
      return {
        ...state,
        isMovingDown: state.navIdx > action.payload,
        navIdx: action.payload
      }
    }
    default:
      throw new Error("Bad action type")
  }
}

const GlobalContextProvider = ({children})=>{
  const [state, dispatch] = useReducer(reducer, initialState)
  return <GlobalStateContext.Provider value={state}>
    <GlobalDispatchContext.Provider value={dispatch}>
    {children}
    </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
}
export default GlobalContextProvider