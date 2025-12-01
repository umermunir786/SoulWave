import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    activePlanForExercise: false,
    activeTabNavigation:false,
    completedFirstDay:false,
};

export const activePlanSlice = createSlice({
  name: "activePlan",
  initialState,
  reducers: {
    setActivePlan: (state, action) => {
      console.log("action.payload", action.payload);
       state.activePlanForExercise = action.payload;
    },
    setActivePlanNavigation: (state, action) => {
      state.activeTabNavigation = action.payload;
    },
    setActivatedPlan: (state, action) => {
      state.completedFirstDay = action.payload;
    }
  }
});
export const {
    setActivePlan,
    setActivePlanNavigation,
    setActivatedPlan
} = activePlanSlice.actions;
export default activePlanSlice.reducer;
