import {useEffect, useState} from "react";
import {MainRouter} from "./MainRouter";
import detectEthereumProvider from "@metamask/detect-provider";

export let provider: any;
function addDisconnectListener(_provider:any, callback?:(available:boolean)=>void){
    _provider.on("disconnect", ()=>{
        console.log('Disconnected');
        callback?.(false);
    })
}
function addConnectListener(_provider: any, callback?: (available: boolean) => void) {
    _provider.on('connect',
        () => {
            console.log('Connected');
            callback?.(true);
        });
}

export async function detectMetaMaskProvider(callback?: (available: boolean) => void) {
    if (provider) {
        addConnectListener(provider,callback);
        addDisconnectListener(provider,callback);
        callback?.(provider.isConnected())
        return;
    }
    detectEthereumProvider().then(prv => {
        provider = prv;
        addConnectListener(provider,callback);
        addDisconnectListener(provider,callback);
        callback?.(provider.isConnected())
    }).catch(err => {
        console.log(err);
        console.log("Please install MetaMask!");
        callback?.(false);
    });
}

export const Main = () => {
    const [metaMaskAvailable, setMetaMaskAvailable] = useState(false);
    useEffect(() => {
        detectMetaMaskProvider(setMetaMaskAvailable);
    }, []);
    console.log("metaMaskAvailable:", metaMaskAvailable);
    return metaMaskAvailable ? <MainRouter/> : <div>Please install MetaMask</div>;
}