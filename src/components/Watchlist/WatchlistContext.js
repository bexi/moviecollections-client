import React, {createContext, useContext, useReducer} from 'react';

export const Context = createContext();
export const WatchlistContextProvider = ({reducer, initialState, children}) =>(
    <Context.Provider value={useReducer(reducer, initialState)}>
        {children}
    </Context.Provider>
);
export const useWatchlistContext = () => useContext(Context);