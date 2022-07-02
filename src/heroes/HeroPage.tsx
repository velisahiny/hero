import {Link, useParams} from "react-router-dom";
import {asyncGetTokenData} from "../utils/requests";
import {useContract} from "../utils/customHooks";
import {useEffect, useState} from "react";
import {HeroCard} from "./HeroCard";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import {HeroTable} from "./HeroTable";
import {HeroAttributeTable} from "./HeroAttributeTable";
import logo from '../logo.svg';
export interface IHeroAttribute {
    trait_type: string;
    value: string | number;
    display_type?: string;
}

export interface IRegions {
    region0: number;
    region1: number;
    region2: number;
    region3: number;
    region4: number;
    region5: number;
    region6: number;
}

export interface IHero {
    attributes: IHeroAttribute[];
    character: string;
    collection_description: string;
    description: string;
    external_url: string;
    extra: number;
    id: number;
    image: string;
    image_cid: string;
    name: string;
    random_number: string;
    rarity_symbol: number;
    regions: IRegions;
}

export const HeroPage = () => {
    const contract = useContract();
    const params = useParams();
    const [hero, setHero] = useState<IHero>();
    const [attributes , setAttributes] =useState<IHeroAttribute[]>();
    useEffect(() => {
        asyncGetTokenData(contract, params.heroID as string, (hero: IHero) => {
            setHero(hero);
            const _attributes = [...hero.attributes];
            setAttributes(_attributes.filter(attr=>attr.trait_type!=='name'));
        })
    }, []);
    return (hero && attributes ? <Container fluid>
        <Row>
            <Link to={"/"}>{<img title={"Go to Main Page"} alt={"Go to Main Page"} src={logo} width={50} height={50} /> }</Link>
        </Row>
        <Row>
            <Col xl={3}>
                <HeroCard hero={hero} showDescription={true}/>
            </Col>
            <Col xl={9}>
                <HeroTable hero={hero}/>
                <HeroAttributeTable attributes={attributes}/>
            </Col>
        </Row>
    </Container> : <Spinner animation="border" variant="primary"/>);

}