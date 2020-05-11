import {API_GET} from "../../utils/api-utils";
import { GET_WATCHLIST } from "./actions";

export const updateWatchlist = async(dispatch) => {
    try {
        const items = await API_GET('/usermovies');
        dispatch({type: GET_WATCHLIST, watchlist: items});
    } catch (e) {
        // TODO: fix error message for user
        alert(e);
    }
}