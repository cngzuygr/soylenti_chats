import { createSlice } from "@reduxjs/toolkit";

export const locationSlice = createSlice({
	name: "location",
	initialState: {
		longitude: null,
		latitude: null,
		distance: {
			radius: 2500,
		},
	},
	reducers: {
		setLocation: (state, action) => {
			(state.longitude = action.payload.longitude),
				(state.latitude = action.payload.latitude);
			state.distance = action.payload.distance;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setLocation } = locationSlice.actions;

export const selectLongitude = (state) => state.location.longitude;
export const selectLatitude = (state) => state.location.latitude;
export const selectDistance = (state) => state.location.distance;

export default locationSlice.reducer;
