import {detectMetaMaskProvider} from "../utils/customHooks";
import {useEffect, useState} from "react";
import {MainRouter} from "./MainRouter";

export const Main = () => {
    const [metaMaskAvailable, setMetaMaskAvailable] = useState(false);
    useEffect(() => {
        detectMetaMaskProvider(setMetaMaskAvailable);
    }, []);
    return metaMaskAvailable ? <MainRouter/> : <div>Please install MetaMask</div>;
}