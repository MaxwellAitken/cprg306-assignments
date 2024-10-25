"use client"

import { useState } from "react";


export default function NewItem( {onAddItem} ) {

    // styles
    let boxStyle = " rounded-lg bg-gray-600 shadow-md shadow-gray-900 ";
    let buttonStyle = " px-3 py-0.5 rounded-lg text-sm ";
    let inactiveStyle = " cursor-default bg-zinc-500 ";
    let activeStyle = " cursor-pointer hover:bg-opacity-80 transition active:scale-90 ";
    let decrementStyle = inactiveStyle;
    let incrementStyle = inactiveStyle;

    // state variables
    const [quantity, setQuantity] = useState(1);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("produce");

    // event handlers
    const handleNameChange = (event) => { setName(event.target.value); }
    const handleCategoryChange = (event) => { setCategory(event.target.value); }
    
    const handleSubmit = (event) => {  
        event.preventDefault(); 

        let item = {
            id: randomString(18),
            name: name,
            quantity: quantity,
            category: category
        };

        console.log(item);

        // call the onAddItem function from the parent component,
        // passing the new item as an argument
        onAddItem(item);

        // reset the form
        setName("");
        setQuantity(1);
        setCategory("produce");
    }

    // generate a random string for the item id
    function randomString(length) {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    // increment and decrement functions
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

    // conditional increment/decrement button styles
    decrementStyle = quantity > 1 ? activeStyle + " bg-red-600 " : inactiveStyle;
    incrementStyle = quantity < 20 ? activeStyle + " bg-green-600 " : inactiveStyle;

    // Increment and decrement button components
    function Button({ func }) {
        if (func === decrement) {
            return  <button type="button" onClick={func} className={buttonStyle + decrementStyle}>-</button> ;
        }
        return  <button type="button" onClick={func} className={buttonStyle + incrementStyle}>+</button> ;
    }


    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-5">

            <input type="text" placeholder="Item Name" required value={name} onChange={handleNameChange} className={"px-2 py-3" + boxStyle} />

            <div className="flex gap-8 basis-1/2">

                <div className={"flex justify-between gap-6 p-3 " + boxStyle}>
                    <span className="w-4">{quantity}</span>
                    <div className="flex gap-2">
                        <Button func={decrement} />
                        <Button func={increment} />
                    </div>
                </div>

                <select value={category} onChange={handleCategoryChange} className={"p-2" + boxStyle}>
                    <option disabled>Category</option>
                    <option selected value="produce">Produce</option>
                    <option value="dairy">Dairy</option>
                    <option value="bakery">Bakery</option>
                    <option value="meat">Meat</option>
                    <option value="frozen foods">Frozen Foods</option>
                    <option value="canned goods">Canned Goods</option>
                    <option value="dry goods">Dry Goods</option>
                    <option value="beverages">Beverages</option>
                    <option value="snacks">Snacks</option>
                    <option value="household">Household</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <button type="submit" className="p-1 rounded-lg text-2xl bg-green-600 shadow-md shadow-gray-900 hover:bg-green-500">+</button>

        </form>
    )
}
