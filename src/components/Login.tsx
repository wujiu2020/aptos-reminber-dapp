import { useEffect, useState } from 'react';

interface LoginProps {
    address: string | null
    onSetAddress: (address: string) => void
}


function Login({ address, onSetAddress }: LoginProps) {
    useEffect(() => {
        getAddress()
    }, [address]);

    const getAddress = async () => {
        await window.aptos!.connect().catch((error: any) => {
            //todo handle error
            console.log(error)
        })
        await window.aptos.account().then(
            (data: { address: string }) => {
                if (data.address === "") {
                    onSetAddress("nil")
                } else {
                    onSetAddress(data.address)
                }
            })
    }

    return (
        <div>
            {address !== '' ? <h3>{address}</h3> : <button onClick={getAddress} className="btn rounded-pill btn-primary">Login</button>}
        </div>
    );
}

export default Login;