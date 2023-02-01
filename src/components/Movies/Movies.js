import SearchForm from "./SearchForm/SearchForm"
import MoviesCardList from "./MoviesCardList/MoviesCardList"

export default function Movies() {
    return (
        <div className="movies">
            <SearchForm></SearchForm>
            <MoviesCardList></MoviesCardList>
        </div>
    )
}