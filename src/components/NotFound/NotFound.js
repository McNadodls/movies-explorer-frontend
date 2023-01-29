import { Link } from "react-router-dom";

export default function NotFound({ history }) {
  return (
    <section className="not-found">
        <div className="section__page section__page_screen_info">
            <div className="not-found__container">
              <div className="not-found__text-container">
                <h2 className="not-found__title">404</h2>
                <p className="not-found__subtitle">Страница не найдена</p>
              </div>
              <Link className="link not-found__backward" onClick={history.goBack}>Назад</Link>
            </div>
        </div>
    </section>
  )
}