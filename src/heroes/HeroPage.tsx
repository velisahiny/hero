import {useParams} from "react-router-dom";


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
    const params = useParams();
    return <div> HeroID: {params.heroID}</div>
}