import React, {useEffect, useMemo, useReducer} from 'react';
import './App.css';
import {ethers} from "ethers";
import HeroesToken from "./HeroesToken.json";
import {FilterComponent} from "./filter/FilterComponent";
import {FilteredHeroes} from "./filter/FilteredHeroes";
import {IHero} from "./heroes/HeroPage";

let contract: ethers.Contract;
let web3provider: ethers.providers.Web3Provider;
const createProviderAndContract = () => {
    // let provider = new ethers.providers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc");
    // @ts-ignore
    web3provider = new ethers.providers.Web3Provider(window.ethereum);
    // signer = web3provider.getSigner();
    const iface = new ethers.utils.Interface(HeroesToken);
    contract = new ethers.Contract("0x9e3F28C3c37ac77684730e223aa7c0621a206CD6", iface, web3provider);
}

function getTokenData(id: string) {
    return new Promise((resolve, reject) => {
        contract.tokenURI(id).then((uri: string) => {
            fetch(uri).then((tokenData: any) => tokenData.json()).then(data => {
                resolve(data);
            });
        }).catch((error: any) => {
            reject(error);
        });
    })

}

const tokenReducer = (state: Map<number, IHero>, action: any): Map<number, IHero> => {
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
    }
}
const initState = new Map<number, any>();
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

const filterByAttributes = (tokensData: Map<number, IHero>, filterMap: Map<string, any>) => {
    const filteredOutData = new Map(tokensData);
    Array.from(filterMap.entries()).forEach(filter => {
        const [filterKey, filterValue] = filter;
        Array.from(tokensData.entries()).forEach(entry => {
            entry[1].attributes.forEach((attribute: any) => {
                if (attribute.display_type !== "number") {
                    if (attribute.trait_type === filterKey && !attribute.value.includes(filterValue)) {
                        filteredOutData.delete(entry[0]);
                    }
                } else {
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
    const [filterMap, dispatchFilterMap] = useReducer(filterReducer, new Map<string, any>());
    useEffect(createProviderAndContract, []);
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
            <FilterComponent changeFilterMap={changeFilterMap}/>
            <FilteredHeroes displayedImages={displayedImages}/>
        </div>);
}


export default App;
