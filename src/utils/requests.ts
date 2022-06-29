import {IHero} from "../heroes/HeroPage";
import {BigNumber, ethers} from "ethers";

export async function asyncGetTokenData(contract: ethers.Contract, id: string, callback?: (data: IHero) => void) {
    const uri = await contract.tokenURI(id);
    const data: IHero = await fetch(uri).then((tokenData: any) => tokenData.json());
    callback?.(data);
}

export async function getTotalSupply( contract: ethers.Contract, callback?:(totalSupply:number)=>void ) {
    const totalSupply = ( await contract.totalSupply() as BigNumber ).toNumber();
    callback?.(totalSupply);
}