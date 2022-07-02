import {Dropdown} from "react-bootstrap";
import React from "react";
export const DropdownFilter = (props: { elements: string[], title:string, activeElement?:string, onChange: React.Dispatch<React.SetStateAction<string|undefined>> }) => {
    const defaultTitle="Select a " + props.title.toUpperCase();
    return <Dropdown>
        <Dropdown.Toggle>
            {props.activeElement ? props.activeElement.toUpperCase() : defaultTitle }
        </Dropdown.Toggle>
        <Dropdown.Menu>
            {props.activeElement ? <Dropdown.Item onClick={()=>props.onChange('')}>{defaultTitle}</Dropdown.Item>: null}
            {
                props.elements.map(element => <Dropdown.Item onClick={()=>props.onChange(element)}>{element}</Dropdown.Item>)
            }
        </Dropdown.Menu>
    </Dropdown>
}
