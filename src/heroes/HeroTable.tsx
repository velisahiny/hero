import {Table} from "react-bootstrap";
import {IHero} from "./HeroPage";

export interface IHeroTableProps {
    hero: IHero;
}

export const HeroTable = (props: IHeroTableProps) => {
    return (<Table responsive striped bordered hover variant="dark">
        <thead>
        <tr>
            <th>Name</th>
            <th>Collection Description</th>
        </tr>
        </thead>
        <tbody>
        <tr><>
            <td>{props.hero.name}</td>
            <td>{props.hero.collection_description}</td>
        </>
        </tr>
        </tbody>
    </Table>);
}