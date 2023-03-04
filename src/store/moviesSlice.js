import {createSlice, createAsyncThunk, compose} from "@reduxjs/toolkit";

//получение всех фильмов
export const getAllMovies = createAsyncThunk(
    "sign/getAllMovies",
    async function(_, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch('https://api.nomoreparties.co/beatfilm-movies' , {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if (!response.ok){
                throw new Error('Can\'t toggle status. Server error.');
            }
            const data = await response.json();
            const dataFilms = await data.map((elem) => {return {
                "country": elem.country,
                "director": elem.director,
                "duration": elem.duration,
                "year": elem.year,
                "description": elem.description,
                "image": `https://api.nomoreparties.co${elem.image.url}`,
                "trailerLink": elem.trailerLink,
                "thumbnail": `https://api.nomoreparties.co${elem.image.formats.thumbnail.url}`,
                "movieId": elem.id,
                "nameRU": elem.nameRU,
                "nameEN": elem.nameEN,
            }})
            await dispatch(setAllMovies({dataFilms}));
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

//получение сохраненных фильмов
export const getSavedMovie = createAsyncThunk(
    "sign/getSavedMovie",
    async function(_, {rejectWithValue, dispatch}) {
        try {
            // const response = await fetch('https://api.mcnad.movie.nomoredomains.club/movies' , {
            //     method: 'GET',
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //         credentials: 'include'
            // });
            // if (!response.ok){
            //     throw new Error('Can\'t toggle status. Server error.');
            // }
            // const dataSavedFilms = await response.json();
            // await dispatch(setSavedMovies({dataSavedFilms}));
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

//сохранение фильмов
export const handleSaveMovie = createAsyncThunk(
    "sign/handleSaveMovie",
    async function({country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN}, {rejectWithValue, dispatch}) {
        console.log({country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN})
        const newSaveFilm = {country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN}
        try {
            // const response = await fetch('https://api.mcnad.movie.nomoredomains.club/movies' , {
            //     method: 'POST',
            //     headers: {
            //             'Content-Type': 'application/json',
            //     },
            //     credentials: 'include',
            //     body: JSON.stringify({country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN})
            // });
            // if (!response.ok){
            //     throw new Error('Can\'t toggle status. Server error.');
            // }
            // const newSaveFilm = await response.json();
            // await dispatch(addtSavedMovies(newSaveFilm))
            dispatch(addtSavedMovies(newSaveFilm))
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

//сохранение фильмов
export const handleDeleteMovie = createAsyncThunk(
    "sign/handleDeleteMovie",
    async function(id, {rejectWithValue, dispatch}) {
        console.log(id)
        try {
            // const response = await fetch(`https://api.mcnad.movie.nomoredomains.club/movies/${id}` , {
            //     method: 'DELETE',
            //     headers: {
            //             'Content-Type': 'application/json',
            //     },
            //     credentials: 'include',
            //     body: JSON.stringify({country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN})
            // });
            // if (!response.ok){
            //     throw new Error('Can\'t toggle status. Server error.');
            // }
            // const resDelete = await response.json();
            // await dispatch(deleteMovie(resDelete.movieId))
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export function handleFoundMovies(arrMovies, query, isShorts) {
        return arrMovies.filter((movie) => {
            return movie.nameRU.toUpperCase().includes(query.toUpperCase()) && !isShorts ? movie
            : movie.nameRU.toUpperCase().includes(query.toUpperCase()) && isShorts && movie.duration <= 40
              ? movie : false
        })
}

export const handleSearchMovie = createAsyncThunk(
    "sign/handleSubmitSignUp",
    async function ({isSave, query, isShorts}, {dispatch, getState}) {
        if (!isSave) {
            const foundMovies = handleFoundMovies(getState().movies.allMovies, query, isShorts)
            
            await dispatch(await setFoundedMovies({foundMovies, query, isShorts}))            
        } else {
            const foundMovies = handleFoundMovies(getState().movies.savedMovie, query, isShorts)
            
            await dispatch(await setSavedFoundedMovies({foundMovies, query, isShorts}))
        }
    }
)

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
    console.log(state.error)
}

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        status: null,
        allMovies: [],
        savedMovies: [],
        foundedMovies: null,
        savedFoundedMovies: null,
    },
    reducers: {
        setAllMovies(state, action) {
            state.allMovies = action.payload.dataFilms;
        },
        setSavedMovies(state, action) {
            state.savedMovies = action.payload.dataSavedFilms;
        },
        addtSavedMovies(state, action) {
            console.log(action.payload)
            state.savedMovies = [action.payload, ...state.savedMovies];
        },
        deleteMovie(state, action) {
            console.log(action.payload)
            state.savedMovies = state.savedMovies.filter((elem) => elem.movieId !== action.payload ? elem : false);
        },
        clearMovie(state, action) {
            state.allMovies = [];
            state.savedMovies = [];
            state.foundedMovies = null;
            state.savedFoundedMovies = null;
        },
        setFoundedMovies(state, action) {
                console.log(action.payload.foundMovies)
                state.foundedMovies = {
                    movies: action.payload.foundMovies,
                    query: action.payload.query,
                    isShorts: action.payload.isShorts,
                }
        },
        setSavedFoundedMovies(state, action) {
            console.log(action.payload.foundMovies)
                state.savedFoundedMovies = {
                    movies: action.payload.foundMovies,
                    query: action.payload.query,
                    isShorts: action.payload.isShorts,
                }
        },
        clearFoundedMovies(state, action) {
            if(!action.payload) {
                state.foundedMovies = null
            } else {
                state.savedFoundedMovies = null
            }
        }
    },
    extraReducers: {
        //получение всех фильмов
        [getAllMovies.pending]: (state) => {
            state.status = 'loading';
            console.log(state.status);
        },
        [getAllMovies.fulfilled]: (state, action) => {
            state.status = "resolved";
            console.log(state.status);
        },
        [getAllMovies.rejected]: setError,
        //поиск фильма всех фильмов
        [handleSearchMovie.pending]: (state) => {
            state.status = 'loading';
            console.log(state.status);
        },
        [handleSearchMovie.fulfilled]: (state, action) => {
            state.status = "resolved";
            console.log(state.status);
        },
        [handleSearchMovie.rejected]: setError,
        
    },

})
export const {setAllMovies, setSavedMovies, addtSavedMovies, deleteMovie, clearMovie, setFoundedMovies, setSavedFoundedMovies, clearFoundedMovies} = moviesSlice.actions;

export default moviesSlice.reducer;