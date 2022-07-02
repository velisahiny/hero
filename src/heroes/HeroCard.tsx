import React from "react";
import {Card} from "react-bootstrap";
import {IHero} from "./HeroPage";
import {Link} from "react-router-dom";

export interface IHeroImageProps {
    hero: IHero;
    showLink?:boolean;
    showDescription?:boolean;
}

export const HeroCard = (props: IHeroImageProps) => {
    return (<Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={props.hero.image}/>
        <Card.Body>
            <Card.Title>{props.hero.name}</Card.Title>
            {props.showDescription &&
            <Card.Text>
                {props.hero.description}
            </Card.Text>
            }
            {props.showLink && <Link to={`/hero/${props.hero.id}`}>Go to Character Page</Link>}
        </Card.Body>
    </Card>);
}