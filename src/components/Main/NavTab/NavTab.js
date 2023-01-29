import { Link } from "react-router-dom";

export default function NavTab () {
    return(
        <section className="nav-tab">
            <div className="nav-tab__links">
                <Link className="link link_decoration_underline nav-tab__link">О проекте</Link>
                <Link className="link link_decoration_underline nav-tab__link">Технологии</Link>
                <Link className="link link_decoration_underline nav-tab__link">Студент</Link>
            </div>
        </section>
    )
}