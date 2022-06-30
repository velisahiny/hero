import React, {useEffect, useMemo, useReducer, useState} from 'react';
import './App.css';
import {FilterComponent} from "./filter/FilterComponent";
import {FilteredHeroes} from "./filter/FilteredHeroes";
import {IHero} from "./heroes/HeroPage";
import {asyncGetTokenData, getTotalSupply} from "./utils/requests";
import {useContract} from "./utils/customHooks";
import {filterByAttributes, filterReducer, tokenReducer} from "./utils/utilFunctions";


function App() {
    const [tokensData, dispatchTokensData] = useReducer(tokenReducer, new Map<number, IHero>());
    const [filterMap, dispatchFilterMap] = useReducer(filterReducer, new Map<string, any>());
    const [totalSupply,setTotalSupply]=useState<number>();
    const contract = useContract();
    useEffect(()=>{
        getTotalSupply(contract,setTotalSupply);
    },[]);
    useEffect(() => {
        if(totalSupply){
            for (let i = 0; i < totalSupply; i++) {
                asyncGetTokenData(contract, i.toString(), (data: IHero) => dispatchTokensData({
                    type: "add",
                    id: data.id,
                    payload: data
                }));
            }
        }
    }, [totalSupply]);
    const changeFilterMap = (event: any) => {
        if (event.target.value !== "") {
            dispatchFilterMap({payload: event.target.value, type: "add", trait_type: event.target.id});
        } else {
            dispatchFilterMap({type: "remove", trait_type: event.target.id});
        }
    }
    const filteredData = useMemo(() => filterByAttributes(tokensData, filterMap), [tokensData, filterMap]);
    const displayedImages: IHero[] = useMemo(() => filteredData ? Array.from(filteredData.entries())
        .map(entry => entry[1] && entry[1]) : [], [filteredData]);
    return (
        <div className="App">
            <FilterComponent key={"filterComponent"} changeFilterMap={changeFilterMap}/>
            <FilteredHeroes key={"filteredHeroes"} displayedImages={displayedImages}/>
        </div>);
}


export default App;
