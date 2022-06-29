import {Table} from "react-bootstrap";
import {IHeroAttribute} from "./HeroPage";

export interface IHeroAttributeTableProps {
    attributes: IHeroAttribute[];
}

export const HeroAttributeTable = (props: IHeroAttributeTableProps) => {
    return <Table responsive striped bordered hover variant="dark">
        <thead>
        <tr>
            {props.attributes.map(attr => <th>{attr.trait_type.toUpperCase()}</th>)}
        </tr>
        </thead>
        <tbody>
        <tr>
            {props.attributes.map(attr => <td>{attr.value}</td>)}
        </tr>
        </tbody>
    </Table>
}