import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userDataSlice";
import activePlanSlice from "./activePlanSlice";


const rootReducer = combineReducers({
  userData: userSlice,
  activePlan: activePlanSlice,
});

export default rootReducer;
