import Hero from "./Hero/Hero";
import NavTab from "./NavTab/NavTab";
import Promo from "./Promo/Promo";
import Techs  from "./Techs/Techs";
import AboutMe  from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio"

export default function Main() {
    return (
        <div className="main">
            <Hero></Hero>
            <NavTab></NavTab>
            <Promo></Promo>
            <Techs></Techs>
            <AboutMe></AboutMe>
            <Portfolio></Portfolio>
        </div>
    )
}

