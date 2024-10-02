"use client"

import { useState } from "react";


export default function NewItem() {


    const [quantity, setQuantity] = useState(1);


    const decrement = () => {
        let currentQuantity = quantity;
        if (currentQuantity > 1) {
            setQuantity(currentQuantity - 1);
        }
    }


    const increment = () => {
        let currentQuantity = quantity;
        if (currentQuantity < 20) {
            setQuantity(currentQuantity + 1);
        }
    }

    
    let buttonStyle = " w-32 py-4 rounded-3xl shadow-gray-900 shadow-lg ";

    let inactiveStyle = " cursor-default bg-zinc-500 ";
    let activeStyle = " cursor-pointer hover:bg-opacity-80 transition active:scale-90 ";

    let decrementStyle = inactiveStyle;
    let incrementStyle = inactiveStyle;

    if (quantity > 1) {
        decrementStyle = activeStyle + " bg-red-600 ";
    }
    if (quantity < 20) {
        incrementStyle = activeStyle + " bg-green-600 ";
    }


    return(
        <div className="flex justify-center pt-24">
            <div className="flex flex-col gap-8 p-4 rounded-3xl text-center bg-gray-800">
                <p className="p-2 rounded-2xl text-8xl bg-gray-700 shadow-lg shadow-gray-900">{quantity}</p>

                <div className="flex gap-32 text-6xl">
                    <button onClick={decrement} className={buttonStyle + decrementStyle + " pt-2.5 "}>-</button> 
                    <button onClick={increment} className={buttonStyle + incrementStyle}>+</button>
                </div>
            </div>
        </div>
    )
}
