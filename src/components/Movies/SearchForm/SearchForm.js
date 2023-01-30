import magnifier from "../../../images/search-form/magnifier.svg"
import Input from "../../containers/Input/Input"

export default function SearchForm () {
    return(
        <section className="search-form section">
            <div className="section__page section__page_screen_movie">
                <form className="search-form__form">
                    <div className="search-form__container">
                        <img className="search-form__image" src={magnifier} alt="Поиск"/>
                        <Input 
                            className="input search-form__input" 
                            placeholder="Фильм"
                            required
                        />
                        <button className="link search-form__submit">Найти</button>
                    </div>
                    <div class="search-form__filter">
                        <input type="checkbox" id="search-form__checkbox" class="search-form__checkbox" />
                        <label htmlFor="search-form__checkbox" class="search-form__label">Короткометражки</label>
                    </div>
                </form>
            </div>
        </section>
    )
}