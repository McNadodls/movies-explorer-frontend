import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

//регистрация
export const handleSubmitSignUp = createAsyncThunk(
    "sign/handleSubmitSignUp",
    async function({input__userName, input__userEmail, input__userPass}, {rejectWithValue, dispatch}) {
        try {
            // const response = await fetch('https://api.nomoreparties.co/beatfilm-movies' , {
            //     method: 'GET',
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            // });
            // if (!response.ok){
            //     throw new Error('Can\'t toggle status. Server error.');
            // }
            // const data = await response.json();
            dispatch(submitSignUp({input__userName, input__userEmail, input__userPass}))
            // return data
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

//вход
export const handleSubmitSingIn = createAsyncThunk(
    "sign/handleSubmitSingIn",
    async function({input__userEmail, input__userPass}, {rejectWithValue, dispatch}) {
        try {
            // const response = await fetch('https://api.nomoreparties.co/beatfilm-movies' , {
            //     method: 'GET',
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            // });
            // if (!response.ok){
            //     throw new Error('Can\'t toggle status. Server error.');
            // }
            // const data = await response.json();
            dispatch(submitSingIn({input__userEmail, input__userPass}))
            // return data
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

//изменение профиля
export const handleUpdateUser = createAsyncThunk(
    "sign/handleUpdateUser",
    async function({input__profoleName, input__profoleEmail}, {rejectWithValue, dispatch}) {
        try {
            // const response = await fetch('https://api.nomoreparties.co/beatfilm-movies' , {
            //     method: 'GET',
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            // });
            // if (!response.ok){
            //     throw new Error('Can\'t toggle status. Server error.');
            // }
            // const data = await response.json();
            dispatch(updateUser({input__profoleName, input__profoleEmail}))
            // return data
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

//выход
export const handleLogOut = createAsyncThunk(
    "sign/handleLogOut",
    async function(_, {rejectWithValue, dispatch}) {
        try {
            // const response = await fetch('https://api.nomoreparties.co/beatfilm-movies' , {
            //     method: 'GET',
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            // });
            // if (!response.ok){
            //     throw new Error('Can\'t toggle status. Server error.');
            // }
            // const data = await response.json();
            dispatch(logOut())
            // return data
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)


const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
    console.log(state.error)
}

const signSlice = createSlice({
    name: 'sign',
    initialState: {
        status: null,
        error: null,
        loggedIn: false,
        currentUser: {}
    },
    reducers: {
        submitSignUp(state, action) {
            state.loggedIn = true;
            state.currentUser = {
                "name": action.payload.input__userName,
                "email": action.payload.input__userEmail,
                "password": action.payload.input__userPass
            };
            console.log(state.currentUser);
        },
        submitSingIn(state, action) {
            state.loggedIn = true;
            state.currentUser = {
                "name": "жопа",
                "email": action.payload.input__userEmail,
                "password": action.payload.input__userPass
            };
            console.log(state.currentUser);
        }, 
        updateUser(state, action) {
            console.log(action.payload.input__profoleEmail, action.payload.input__profoleName)
            state.currentUser = {
                ...state.currentUser,
                "email": action.payload.input__profoleEmail,
                "name": action.payload.input__profoleName
            }
            console.log(state.currentUser);
        },
        logOut(state, action) {
            state.loggedIn = false;
            state.currentUser = {};
            
        },
    },
    extraReducers: {
        //регистрация
        [handleSubmitSignUp.pending]: (state) => {
            state.status = 'loading';
            console.log(state.status);
        },
        [handleSubmitSignUp.fulfilled]: (state, action) => {
            state.status = "resolved";
            console.log(state.status);
        },
        [handleSubmitSignUp.rejected]: setError,
        //вход
        [handleSubmitSingIn.pending]: (state) => {
            state.status = 'loading';
            console.log(state.status);
        },
        [handleSubmitSingIn.fulfilled]: (state, action) => {
            state.status = "resolved";
            console.log(state.status);
        },
        [handleSubmitSingIn.rejected]: setError,
        //обновление профиля
        [handleUpdateUser.pending]: (state) => {
            state.status = 'loading';
            console.log(state.status);
        },
        [handleUpdateUser.fulfilled]: (state, action) => {
            state.status = "resolved";
            console.log(state.status);
        },
        [handleUpdateUser.rejected]: setError,
        //выход
        [handleLogOut.pending]: (state) => {
            state.status = 'loading';
            console.log(state.status);
        },
        [handleLogOut.fulfilled]: (state, action) => {
            state.status = "resolved";
            console.log(state.status);
        },
        [handleLogOut.rejected]: setError,
    },

})
export const {submitSignUp, submitSingIn, updateUser, logOut} = signSlice.actions;

export default signSlice.reducer;
