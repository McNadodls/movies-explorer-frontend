import Input from "../containers/Input/Input";

export default function Profile() {
    return (
        <section className="profile section">
            <div className="section__page section__page_screen_info">
                <div className="profile__container">
                    <h2 className="profile__title">Привет, Виталий!</h2>
                    <form className="profile__form">
                        <div className="profile__input-container">
                            <fieldset className="profile__fieldset">
                            <label className="profile__label" htmlFor="input__profoleName">Имя</label>
                            <Input placeholder="Имя" className="input profile__input" id="input__profoleName" name="input__profoleName"/>
                            </fieldset>
                            <fieldset className="profile__fieldset">
                            <label className="profile__label" htmlFor="input__profoleEmail">E-mail</label>
                            <Input placeholder="E-mail@Email.ru" className="input profile__input" id="input__profoleEmail" name="input__profoleEmail"/>
                            </fieldset>
                        </div>
                        <div className="profile__btn-container">
                            <button className="link profile__submit">Редактировать</button>
                            <button className="link profile__exit">Выйти из аккаунта</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}