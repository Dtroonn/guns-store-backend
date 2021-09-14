import { combineReducers } from "redux";

import initialize from "./initialize";
import filters from "./filters";
import products from "./products";
import favorites from "./favorites";
import popups from "./popups";
import cart from "./cart";
import ordering from "./ordering";

const rootReducer = combineReducers({
	initialize,
	filters,
	products,
	favorites,
	popups,
	cart,
	ordering,
});

export default rootReducer;
