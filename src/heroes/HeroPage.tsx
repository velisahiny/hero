import {useParams} from "react-router-dom";
import {asyncGetTokenData} from "../utils/requests";
import {useContract} from "../utils/customHooks";
import {useEffect, useState} from "react";
import {HeroCard} from "./HeroCard";
import {Spinner} from "react-bootstrap";
import {HeroTable} from "./HeroTable";
import {HeroAttributeTable} from "./HeroAttributeTable";

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
    useEffect(() => {
        asyncGetTokenData(contract, params.heroID as string, (hero: IHero) => {
            setHero(hero);
        })
    }, []);
    return (
        hero ? <>
            <HeroCard hero={hero}/>
            <HeroTable hero={hero}/>
            <HeroAttributeTable attributes={hero.attributes}/>
        </> : <Spinner animation="border" variant="primary"/>);

}