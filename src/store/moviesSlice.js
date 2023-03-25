import { createSlice, createAsyncThunk, compose } from "@reduxjs/toolkit";
import { shortsDuration } from "../constants"

//Запрос на все фильмы
export const sendMovieRequest = createAsyncThunk(
    "movies/sendMovieRequest",
    async function(_, {rejectWithValue, dispatch, getState}) {
        if (getState().movies.allMovies.length === 0) { 
            await dispatch(await getAllMovies())
        }
        await dispatch(await getSavedMovie()); 
        await dispatch(await updateSaveAllMovies());
    }
)

//получение всех фильмов
export const getAllMovies = createAsyncThunk(
    "movies/getAllMovies",
    async function(_, {rejectWithValue, dispatch}) {
        try {
            const response = await fetch('https://api.nomoreparties.co/beatfilm-movies' , {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if (!response.ok){
                const err = await response.json();
                throw new Error(err.message);
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
                "isSaved": false,
            }})
            dispatch(setAllMovies({dataFilms}));
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

//получение сохраненных фильмов
export const getSavedMovie = createAsyncThunk(
    "movies/getSavedMovie",
    async function(_, {rejectWithValue, dispatch, getState}) {
        const token = getState().sign.currentUser.token;
        try {
            const response = await fetch('https://api.mcnad.movie.nomoredomains.work/movies' , {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok){
                const err = await response.json();
                throw new Error(err.message);
            }
            const dataSavedFilms = await response.json();
            dispatch(setSavedMovies({dataSavedFilms}));
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

//сохранение фильмов
export const handleSaveMovie = createAsyncThunk(
    "movies/handleSaveMovie",
    async function({country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN}, {rejectWithValue, dispatch, getState}) {
        const token = getState().sign.currentUser.token;
        const newSaveFilm = {country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN}
        try {
            const response = await fetch('https://api.mcnad.movie.nomoredomains.work/movies' , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN})
            });
            if (!response.ok){
                const err = await response.json();
                throw new Error(err.message);
            }
            const newSaveFilm = await response.json();
            dispatch(addSavedMovies(newSaveFilm));
            dispatch(toggleLikeMovie(newSaveFilm.movieId));
            dispatch(updateAllFounded());            
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

//удаление фильмов
export const handleDeleteMovie = createAsyncThunk(
    "movies/handleDeleteMovie",
    async function(id, {rejectWithValue, dispatch, getState}) {
        const token = getState().sign.currentUser.token;
        console.log(id)
        try {
            const response = await fetch(`https://api.mcnad.movie.nomoredomains.work/movies/${id}` , {
                method: 'DELETE',
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok){
                const err = await response.json();
                throw new Error(err.message);
            }
            const resDelete = await response.json();
            dispatch(deleteMovie(resDelete.movieId));
            dispatch(toggleLikeMovie(resDelete.movieId));
            dispatch(updateAllFounded());
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const updateAllFounded = createAsyncThunk(
    "movies/updateAllFound",
    async function(_, {dispatch, getState}) {
        if (getState().movies.foundedMovies) {
            const foundMovies = handleFoundMovies(
                getState().movies.allMovies, 
                getState().movies.foundedMovies.query, 
                getState().movies.foundedMovies.isShorts
            )
            dispatch(setUpdateFoundedMovies(foundMovies));
        }
        if (getState().movies.savedFoundedMovies) {
            const foundMovies = handleFoundMovies(
                getState().movies.savedMovies, 
                getState().movies.savedFoundedMovies.query, 
                getState().movies.savedFoundedMovies.isShorts
            )
            dispatch(setUpdateSavedFoundedMovies(foundMovies));
        }
    }
)

export function handleFoundMovies(arrMovies, query, isShorts) {
    return arrMovies.filter((movie) => {
        return movie.nameRU.toUpperCase().includes(query.toUpperCase()) && !isShorts ? movie
        : movie.nameRU.toUpperCase().includes(query.toUpperCase()) && isShorts && movie.duration <= shortsDuration
          ? movie : false
    })
}

export const handleSearchMovie = createAsyncThunk(
    "movies/handleSearchMovie",
    async function ({isSave, query, isShorts}, {dispatch, getState}) {
        if (!isSave) {
            const foundMovies = handleFoundMovies(getState().movies.allMovies, query, isShorts)
            
            await dispatch(await setFoundedMovies({foundMovies, query, isShorts}))            
        } else {
            const foundMovies = handleFoundMovies(getState().movies.savedMovies, query, isShorts)
            
            await dispatch(await setSavedFoundedMovies({foundMovies, query, isShorts}))
        }
    }
)

const setError = (state, action) => {
    state.status = "rejected";
    state.error = action.payload;
}

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        status: null,
        error: null,
        message: null,
        allMovies: [],
        savedMovies: [],
        foundedMovies: null,
        savedFoundedMovies: null,
    },
    reducers: {
        clearMovieErr(state, action) {
            state.error = null;
            state.status = "resolved";
        },
        setAllMovies(state, action) {
            state.allMovies = action.payload.dataFilms;
        },
        setSavedMovies(state, action) {
            state.savedMovies = action.payload.dataSavedFilms;
        },
        updateSaveAllMovies(state, action){
            state.allMovies = state.allMovies.map((movie) => {
                const likedMovie = state.savedMovies.find((savedMovie) => {
                    return savedMovie.movieId === movie.movieId
                });
                if (likedMovie) {
                    return {...movie, isSaved: true }
                } 
                return movie
            })
        },
        toggleLikeMovie(state, action) {
            const likedMovie = state.allMovies.find(currentMovie => currentMovie.movieId === action.payload)
            if (likedMovie) {
                likedMovie.isSaved = !likedMovie.isSaved
            }
        },
        addSavedMovies(state, action) {
            console.log(state.savedMovies)
            state.savedMovies = [...state.savedMovies, action.payload];
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
        setUpdateFoundedMovies(state, action) {
            console.log("обновил")
            state.foundedMovies = {
                ...state.foundedMovies,
                movies: action.payload
            }
        },
        setUpdateSavedFoundedMovies(state, action) {
            console.log("обновил")
            state.savedFoundedMovies = {
                ...state.savedFoundedMovies,
                movies: action.payload
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
        //получение сохраненных фильмов
        [getSavedMovie.pending]: (state) => {
            state.status = 'loading';
            console.log(state.status);
        },
        [getSavedMovie.fulfilled]: (state, action) => {
            state.status = "resolved";
            console.log(state.status);
        },
        [getSavedMovie.rejected]: setError,
        //сохранение фильмов
        [handleSaveMovie.pending]: (state) => {
            state.status = 'loading';
            console.log(state.status);
        },
        [handleSaveMovie.fulfilled]: (state, action) => {
            state.status = "resolved";
            console.log(state.status);
        },
        [handleSaveMovie.rejected]: setError,
        //удаление фильмов
        [handleDeleteMovie.pending]: (state) => {
            state.status = 'loading';
            console.log(state.status);
        },
        [handleDeleteMovie.fulfilled]: (state, action) => {
            state.status = "resolved";
            console.log(state.status);
        },
        [handleDeleteMovie.rejected]: setError,
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
export const {clearMovieErr, setAllMovies, setSavedMovies, updateSaveAllMovies, toggleLikeMovie, addSavedMovies, deleteMovie, clearMovie, setFoundedMovies, setSavedFoundedMovies, setUpdateFoundedMovies, setUpdateSavedFoundedMovies, clearFoundedMovies} = moviesSlice.actions;

export default moviesSlice.reducer;