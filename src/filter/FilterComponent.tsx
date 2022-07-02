import React, {useEffect, useState} from "react";
import {Form, InputGroup} from "react-bootstrap";
import {DropdownFilter} from "./DropdownFilter";

const filterableAttributes = [
    {trait_type: 'name'},
    {display_type: 'number', trait_type: 'generation'},
    {display_type: 'number', trait_type: 'level'},
    {display_type: 'number', trait_type: 'attack'},
    {display_type: 'number', trait_type: 'defense'},
    {display_type: 'number', trait_type: 'endurance'},
    {display_type: 'number', trait_type: 'item_slots'}];


export interface IFilterComponentProps {
    changeFilterMap: (id: string, value: string | number) => void;
}

const heroClasses = ["gunslinger", "warrior", "mystic", "neutral"];
const heroRarities = ["legendary", "uncommon", "common", "epic", "rare"];
const heroTendencies = ["defensive", "offensive"];
export const FilterComponent = (props: IFilterComponentProps) => {
    const [heroClass, setHeroClass] = useState<string>();
    const [heroRarity, setHeroRarity] = useState<string>();
    const [heroTendency, setHeroTendency] = useState<string>();


    useEffect(() => props.changeFilterMap("class", heroClass ?? ''), [heroClass]);
    useEffect(() => props.changeFilterMap("tendency", heroTendency ?? ''), [heroTendency]);
    useEffect(() => props.changeFilterMap("rarity", heroRarity ?? ''), [heroRarity]);

    const inputChange = (event: any) => {
        props.changeFilterMap(event.target.id, event.target.value);
    }

    return <InputGroup size="sm" className="mb-3">
        <DropdownFilter activeElement={heroClass} onChange={setHeroClass} title={"Class"} elements={heroClasses}></DropdownFilter>
        <DropdownFilter activeElement={heroRarity} onChange={setHeroRarity} title={"Rarity"} elements={heroRarities}></DropdownFilter>
        <DropdownFilter activeElement={heroTendency} onChange={setHeroTendency} title={"Tendency"} elements={heroTendencies}></DropdownFilter>
        {filterableAttributes.map(
            attribute => <>
                <InputGroup.Text key={attribute.trait_type + '_span'}>{attribute.trait_type} </InputGroup.Text>
                <Form.Control
                    id={attribute.trait_type}
                    key={attribute.trait_type}
                    title={attribute.trait_type}
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    type={attribute.display_type ?? "text"}
                    onChange={inputChange}/>
            </>
        )}
    </InputGroup>

}