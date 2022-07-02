import {HeroCard} from "../heroes/HeroCard";
import React from "react";
import {IHero} from "../heroes/HeroPage";
import {Col} from "react-bootstrap";



export interface IFilteredHeroesProps {
    displayedImages: IHero[];
}

export const FilteredHeroes = (props: IFilteredHeroesProps) => {
    return <>{props.displayedImages.map(hero => <Col sm={true} ><HeroCard key={hero.id.toString()} hero={hero} showLink={true}/> </Col>)}</>
}