import {createSlice} from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchInputValue: "",

    },
    reducers: {
        // submitSignUp(state, action) {
        //     state.loggedIn = true;
        //     state.currentUser = {
        //         "name": action.payload.input__userName,
        //         "email": action.payload.input__userEmail,
        //         "password": action.payload.input__userPass
        //     };
        //     console.log(state.currentUser);
        // },
    },
    extraReducers: {
        //регистрация
        // [getAllMovies.pending]: (state) => {
        //     state.status = 'loading';
        //     console.log(state.status);
        // },
        // [getAllMovies.fulfilled]: (state, action) => {
        //     state.status = "resolved";
        //     console.log(state.status);
        // },
        // [getAllMovies.rejected]: setError,
        
    },

})
export const {getMovies} = searchSlice.actions;

export default searchSlice.reducer;