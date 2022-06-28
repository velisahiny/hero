import React from "react";
import {Form, InputGroup} from "react-bootstrap";

const filterableAttributes = [
    {trait_type: 'rarity'},
    {trait_type: 'name'},
    {trait_type: 'class'},
    {trait_type: 'tendency'},
    {display_type: 'number', trait_type: 'generation'},
    {display_type: 'number', trait_type: 'level'},
    {display_type: 'number', trait_type: 'attack'},
    {display_type: 'number', trait_type: 'defense'},
    {display_type: 'number', trait_type: 'endurance'},
    {display_type: 'number', trait_type: 'item_slots'}];


export interface IFilterComponentProps {
    changeFilterMap: (event: any) => void;
}

export const FilterComponent = (props: IFilterComponentProps) => {
    return <InputGroup size="sm" className="mb-3">
        {filterableAttributes.map(
            attribute => <>
                <InputGroup.Text key={attribute.trait_type + '_span'}>{attribute.trait_type} </InputGroup.Text>
                <Form.Control
                    id={attribute.trait_type}
                    key={attribute.trait_type}
                    title={attribute.trait_type}
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    type={attribute.display_type ?? "text"} onChange={props.changeFilterMap}/>
            </>
        )}
    </InputGroup>

}