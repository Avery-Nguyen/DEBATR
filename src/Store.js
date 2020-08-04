import React, { createContext, useReducer } from "react";
import Reducer from './Reducer'

const StoreContext = createContext();

const initialState = {
  roomName: "",
  currentSocket: null,
  visualMode: "LOBBY"
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  )
};

export default Store;

export const useStore = () => {
  const context = React.useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStore must be used within provider')
  }
  return context
}