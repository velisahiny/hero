import React from "react";
import {Card} from "react-bootstrap";
import {IHero} from "./HeroPage";
import {Link} from "react-router-dom";

export interface IHeroImageProps {
    hero: IHero;
}

export const HeroCard = (props: IHeroImageProps) => {
    return (<Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={props.hero.image}/>
        <Card.Body>
            <Card.Title>{props.hero.name}</Card.Title>
            <Card.Text>
                {props.hero.description}
            </Card.Text>
            <Link to={`/hero/${props.hero.id}`}>Go to Character Page</Link>
        </Card.Body>
    </Card>);
}