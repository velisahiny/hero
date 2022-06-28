import {HeroCard} from "../heroes/HeroCard";
import React from "react";
import {IHero} from "../heroes/HeroPage";



export interface IFilteredHeroesProps {
    displayedImages: IHero[];
}

export const FilteredHeroes = (props: IFilteredHeroesProps) => {
    return <div>{props.displayedImages.map(hero => <HeroCard key={hero.id.toString()}
                                                                  hero={hero}/>)}</div>
}