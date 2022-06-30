import {ethers} from "ethers";
import HeroesToken from "../HeroesToken.json";
import {provider} from "../routes/Main";
let contract: ethers.Contract;
let web3provider: ethers.providers.Web3Provider;
function createWeb3Provider() {
    web3provider = new ethers.providers.Web3Provider(provider);
    return web3provider;
}

function createContract(provider: ethers.providers.Web3Provider) {
    // signer = web3provider.getSigner();
    const iface = new ethers.utils.Interface(HeroesToken);
    contract = new ethers.Contract("0x9e3F28C3c37ac77684730e223aa7c0621a206CD6", iface, provider);
    return contract;
}

export function useWeb3Provider(): ethers.providers.Web3Provider {
    if (!web3provider) {
        createWeb3Provider();
    }
    return web3provider;
}

export function useContract(): ethers.Contract {
    const provider = useWeb3Provider();
    if (!contract) {
        contract = createContract(provider);
    }
    return contract;
}

