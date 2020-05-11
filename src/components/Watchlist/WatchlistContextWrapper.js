import React from "react";

import {WatchlistContextProvider, useWatchlistContext} from "./WatchlistContext";
import Main from "./Main";
import { GET_WATCHLIST, SET_WATCHED_SWITCH} from "./actions";

export default (props) => {

    const initialState = {
        watchlist: [],
        watchedSwitched: {
            watchlist:false,
            watched: true,
            all: false
        }
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case GET_WATCHLIST:
                return {
                    ...state,
                    watchlist: action.watchlist
                };

            case SET_WATCHED_SWITCH:
                return {
                    ...state,
                    watchedSwitched: action.watchedSwitched
                };

            default:
                return state;
        }
    };

    return (
        <WatchlistContextProvider initialState={initialState} reducer={reducer}>
            <Main {...props}/>
        </WatchlistContextProvider>
    );
}