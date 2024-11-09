"use client"

import { useState } from "react";


export default function NewItem( {onAddItem} ) {

    // styles
    let boxStyle = " h-10 px-3 py-2 rounded-lg bg-gray-800 drop-shadow-2xl ";
    let buttonStyle = "  w-8 px-3 rounded-lg text-md ";
    let inactiveStyle = " cursor-default bg-zinc-500 ";
    let activeStyle = " cursor-pointer transition active:scale-90 ";
    let decrementStyle = inactiveStyle;
    let incrementStyle = inactiveStyle;

    // state variables
    const [quantity, setQuantity] = useState(1);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("produce");
    // list of categories for the select element
    const categories = ["dairy", "bakery", "meat", "frozen foods", "canned goods", "dry goods", "beverages", "snacks", "household", "other"];

    // event handlers
    const handleNameChange = (event) => { setName(event.target.value); }
    const handleCategoryChange = (event) => { setCategory(event.target.value); }
    // form submission handler 
    const handleSubmit = (event) => {  
        event.preventDefault(); 
        let item = {
            id: randomString(18),
            name: name,
            quantity: quantity,
            category: category
        };
        onAddItem(item);
        // reset the form
        setName("");
        setQuantity(1);
        setCategory("produce");
    }

    // generate a random string for the item id
    function randomString(length) {
        let result = "";
        let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for ( let i = 0; i < length; i++ ) result += chars.charAt( Math.floor(Math.random() * chars.length) );
        return result;
    }

    // increment and decrement functions
    const decrement = () => {
        let currentQuantity = quantity;
        if (currentQuantity > 1) setQuantity(currentQuantity - 1);
    }
    const increment = () => {
        let currentQuantity = quantity;
        if (currentQuantity < 20) setQuantity(currentQuantity + 1);
    }

    // conditional increment/decrement button styles
    decrementStyle = quantity > 1 ? activeStyle + " bg-red-600 hover:bg-red-700 " : inactiveStyle;
    incrementStyle = quantity < 20 ? activeStyle + " bg-green-600 hover:bg-green-700 " : inactiveStyle;

    // Increment and decrement button components
    function Button({func}) {
        if (func === decrement) {
            return <button type="button" onClick={func} className={buttonStyle + decrementStyle}>-</button> ;
        }
        return <button type="button" onClick={func} className={buttonStyle + incrementStyle}>+</button> ;
    }

    return(
        
        <form onSubmit={handleSubmit} className="w-80 max-w-full self-center flex flex-col gap-3 p-3 rounded-xl bg-gray-900 bg-opacity-95">

            <input type="text" placeholder="Item Name" required value={name} onChange={handleNameChange} 
            className={boxStyle} />

            <div className="flex justify-between">

                <div className={"w-5/12 flex justify-between gap-2 " + boxStyle}>
                    <span className="w-3">{quantity}</span>
                    <div className="flex justify-between items-center gap-2">
                        <Button func={decrement} />
                        <Button func={increment} />
                    </div>
                </div>

                <select value={category} onChange={handleCategoryChange} className={"w-5/12 text-sm " + boxStyle}>
                    <option disabled>Category</option>
                    <option selected value="produce">Produce</option>
                    { categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat.replace(cat[0], cat[0].toUpperCase())}</option>
                    ))}
                </select>

            </div>

            <button type="submit" className="p-1 rounded-lg text-2xl bg-green-600 drop-shadow-2xl hover:bg-green-700 transition hover:scale-95 ">+</button>

        </form>
    )
}
