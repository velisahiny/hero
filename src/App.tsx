import React, {useEffect, useMemo, useReducer, useState} from 'react';
import './App.css';
import {FilterComponent} from "./filter/FilterComponent";
import {FilteredHeroes} from "./filter/FilteredHeroes";
import {IHero} from "./heroes/HeroPage";
import {asyncGetTokenData, getTotalSupply} from "./utils/requests";
import {useContract} from "./utils/customHooks";
import {filterByAttributes, filterReducer, tokenReducer} from "./utils/utilFunctions";
import {Container, Row} from "react-bootstrap";


function App() {
    const [tokensData, dispatchTokensData] = useReducer(tokenReducer, new Map<number, IHero>());
    const [filterMap, dispatchFilterMap] = useReducer(filterReducer, new Map<string, any>());
    const [totalSupply, setTotalSupply] = useState<number>();
    const contract = useContract();
    useEffect(() => {
        getTotalSupply(contract, setTotalSupply);
    }, []);
    useEffect(() => {
        if (totalSupply) {
            for (let i = 0; i < totalSupply; i++) {
                asyncGetTokenData(contract, i.toString(), (data: IHero) => dispatchTokensData({
                    type: "add",
                    id: data.id,
                    payload: data
                }));
            }
        }
    }, [totalSupply]);
    const changeFilterMap = (id: string, value: string | number) => {
        if (value && value !== "") {
            dispatchFilterMap({payload: value, type: "add", trait_type: id});
        } else {
            dispatchFilterMap({type: "remove", trait_type: id});
        }
    }
    const filteredData = useMemo(() => filterByAttributes(tokensData, filterMap), [tokensData, filterMap]);
    const displayedImages: IHero[] = useMemo(() => filteredData ? Array.from(filteredData.entries())
        .map(entry => entry[1] && entry[1]) : [], [filteredData]);
    return (
        <div className="App">
            <Container fluid>
                <Row>
                    <FilterComponent key={"filterComponent"} changeFilterMap={changeFilterMap}/>
                </Row>
                <Row>
                    <FilteredHeroes key={"filteredHeroes"} displayedImages={displayedImages}/>
                </Row>
            </Container>
        </div>);
}


export default App;
