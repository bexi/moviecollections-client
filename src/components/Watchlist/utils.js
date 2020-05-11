import {API_GET} from "../../utils/api-utils";
import { GET_WATCHLIST } from "./actions";

export const filterWatchlist  = (watchlist, watchedSwitched) => {
    return watchlist.filter((item) => {
    if(watchedSwitched.all) return true;
    if(watchedSwitched.watched) return item.watched==watchedSwitched.watched;
    else return (item.watched == watchedSwitched || item.watched == null);
    });
}

export const updateWatchlist = async(dispatch) => {
    try {
        const items = await API_GET('/usermovies');
        dispatch({type: GET_WATCHLIST, watchlist: items});
    } catch (e) {
        // TODO: return promise or error
        alert(e);
    }
}