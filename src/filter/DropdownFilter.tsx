import {Dropdown} from "react-bootstrap";
import React from "react";
export const DropdownFilter = (props: { elements: string[], title:string }) => {
    return <Dropdown>
        <Dropdown.Toggle>
            {props.title}
        </Dropdown.Toggle>
        <Dropdown.Menu>
            {
                props.elements.map(element => <Dropdown.Item>{element}</Dropdown.Item>)
            }
        </Dropdown.Menu>
    </Dropdown>
}
