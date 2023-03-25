import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

//получение пользователя
export const getCurentUser = createAsyncThunk(
    "sign/getCurentUser",
    async function(_, {rejectWithValue, dispatch, getState}) {
        const token = getState().sign.currentUser.token;
        try {
            const response = await fetch('https://api.mcnad.movie.nomoredomains.work/users/me' , {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (!response.ok){
                const err = await response.json();
                throw new Error(err.message);
            }
            const data = await response.json();
            dispatch(setCurentUser(data))
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

//регистрация
export const handleSubmitSignUp = createAsyncThunk(
    "sign/handleSubmitSignUp",
    async function({name, email, pass}, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch('https://api.mcnad.movie.nomoredomains.work/signup' , {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "name": name,
                    "email": email,
                    "password": pass,
                  })
            });
            if (!response.ok){
                const err = await response.json();
                throw new Error(err.message);
            }
            const data = await response.json();
            dispatch(submitSignUp(data))
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

//вход
export const handleSubmitSingIn = createAsyncThunk(
    "sign/handleSubmitSingIn",
    async function({email, pass}, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch('https://api.mcnad.movie.nomoredomains.work/signin' , {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "email": email,
                    "password": pass,
                  })
            });
            if (!response.ok){
                const err = await response.json();
                throw new Error(err.message);
            }
            const data = await response.json();
            dispatch(submitSingIn(data))
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

//изменение профиля
export const handleUpdateUser = createAsyncThunk(
    "sign/handleUpdateUser",
    async function({name, email}, {rejectWithValue, dispatch, getState}) {
        const token = getState().sign.currentUser.token;
        try {
            const response = await fetch('https://api.mcnad.movie.nomoredomains.work/users/me' , {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
                body: JSON.stringify({
                    "name": name,
                    "email": email,
                }),
            });
            if (!response.ok){
                const err = await response.json();
                throw new Error(err.message);
            }
            const data = await response.json();
            dispatch(updateUser(data))
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
            const response = await fetch('https://api.mcnad.movie.nomoredomains.work/signout' , {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
            });
            if (!response.ok){
                const err = await response.json();
                throw new Error(err.message);
            }
            const data = await response.json();
            console.log(data);
            dispatch(logOut())
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)


const setError = (state, action) => {
    state.status = "rejected";
    state.error = action.payload;
}

const signSlice = createSlice({
    name: 'sign',
    initialState: {
        status: null,
        error: null,
        message: null,
        loggedIn: false,
        currentUser: {}
    },
    reducers: {
        clearSignErr(state, action) {
            state.error = null;
            state.message = null;
            state.status = "resolved";
        },
        setCurentUser(state, action) {
            console.log("Проверил JWT все ок");
        },
        submitSignUp(state, action) {
            state.loggedIn = true;
            state.message = "Регистрация прошла успешна";
            state.currentUser = action.payload;
            console.log(state.currentUser);
        },
        submitSingIn(state, action) {
            state.loggedIn = true;
            state.currentUser = action.payload;
            console.log(state.currentUser);
        }, 
        updateUser(state, action) {
            state.message = "Профиль изменен";
            state.currentUser = {
                ...state.currentUser,
                "email": action.payload.email,
                "name": action.payload.name,
            };
            console.log(state.currentUser);
        },
        logOut(state, action) {
            state.loggedIn = false;
            state.currentUser = {};

        },
    },
    extraReducers: {
        //получение пользователя
        [getCurentUser.pending]: (state) => {
            state.status = 'loading';
            console.log(state.status);
        },
        [getCurentUser.fulfilled]: (state, action) => {
            state.status = "resolved";
            console.log(state.status);
        },
        [getCurentUser.rejected]: (state, action) => {
            state.loggedIn = false;
            state.currentUser = {};
            setError(state, action);
        },
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
export const {clearSignErr, setCurentUser, submitSignUp, submitSingIn, updateUser, logOut} = signSlice.actions;

export default signSlice.reducer;
