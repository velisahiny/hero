import React, {useEffect, useReducer, useRef, useState} from 'react';
import './App.css';
import {ethers} from "ethers";
import HeroesToken from "./HeroesToken.json";
import {HeroImage} from './heroes/HeroImage';

let provider: ethers.providers.JsonRpcProvider, signer, contract: ethers.Contract;

const createProviderAndSigner = () => {
    provider = new ethers.providers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc");
    signer = provider.getSigner();
}
const createContract = () => {
    const iface = new ethers.utils.Interface(HeroesToken);
    contract = new ethers.Contract("0x9e3F28C3c37ac77684730e223aa7c0621a206CD6", iface, provider);
}


function getTokenData(id: string) {
    return new Promise((resolve, reject) => {
        contract.tokenURI(id).then((uri: string) => {
            const result = fetch(uri).then((tokenData: any) => tokenData.json()).then(data => {
                resolve(data);
            });
        }).catch((error: any) => {
            reject(error);
        });
    })

}


const tokenReducer = (state: Map<number, any>, action: any): Map<number, any> => {
    switch (action.type) {
        case "bulk_add":
            action.payload.forEach((data: any) => {
                state.set(data.id, data);
            })
            return new Map(state);
        case "add":
            return state.set(action.id, action.payload);
        case "remove":
            state.delete(action.id);
            return new Map(state);
        default:
            return new Map(state);
            break;
    }
}


const initState = new Map<number, any>();


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

const filterReducer = (state: Map<string, any>, action: any): Map<string, any> => {
    switch (action.type) {
        case "add":
            return new Map(state.set(action.trait_type, action.payload));
        case "remove":
            state.delete(action.trait_type);
            return new Map(state);
        default:
            return new Map(state);
    }
}

const filterByAttributes = (tokensData: Map<number, any>, filterMap: Map<string, any>) => {
    const filteredOutData = new Map(tokensData);
    Array.from(filterMap.entries()).forEach(filter => {
        const [filterKey, filterValue] = filter;
        Array.from(tokensData.entries()).forEach(entry => {
            entry[1].attributes.forEach((attribute: any) => {
                if(attribute.display_type!=="number"){
                    if ( attribute.trait_type === filterKey && !attribute.value.includes(filterValue)) {
                        filteredOutData.delete(entry[0]);
                    }
                }else{
                    if (attribute.trait_type === filterKey && attribute.value.toString() !== filterValue) {
                        filteredOutData.delete(entry[0]);
                    }
                }
            });
        });
    });
    return filteredOutData;

}

function App() {
    const [tokensData, dispatchTokensData] = useReducer(tokenReducer, initState);
    const [filterMap, dispatchFilterMap] = useReducer(filterReducer, new Map<string, any>);

    const filterData = (event: any) => {
        if (event.target.value != "") {
            dispatchFilterMap({payload: event.target.value, type: "add", trait_type: event.target.id});
        } else {
            dispatchFilterMap({type: "remove", trait_type: event.target.id});
        }
    }


    const filterComponent = () => {
        return filterableAttributes.map(
            attribute => <>
                <span>{attribute.trait_type} </span>
                <input id={attribute.trait_type} key={attribute.trait_type} title={attribute.trait_type}
                       type={attribute.display_type ?? "text"} onChange={filterData}/>
            </>
        )

    }

    useEffect(createProviderAndSigner, []);
    useEffect(createContract, []);

    useEffect(() => {
        let heroesData: any[] = [];
        let getTokenPromises: Promise<any>[] = [];
        for (let i = 1; i < 40; i++) {
            getTokenPromises.push(getTokenData(i.toString()).then((data: any) => {
                heroesData.push(data);
            }));
        }
        Promise.all(getTokenPromises).then(() => {
            dispatchTokensData({type: "bulk_add", payload: heroesData});
        });
    }, []);
    const filteredData = filterByAttributes(tokensData, filterMap);
    let displayedImages: { id: number, image: string }[] = [];
    if (filteredData) {
        displayedImages = Array.from(filteredData.entries())
            .map(entry => entry[1] && {id: entry[0], image: entry[1].image});
    }
    ;
    return (
        <div className="App">
            {filterComponent()}

            <div>{displayedImages.map(entry => <HeroImage key={entry.id.toString()} imageURL={entry.image}/>)}</div>
        </div>);
}


export default App;
