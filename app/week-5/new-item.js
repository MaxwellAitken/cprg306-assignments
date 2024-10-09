"use client"

import { useState } from "react";


export default function NewItem() {

    
    let boxStyle = " rounded-lg bg-gray-600 shadow-md shadow-gray-900 ";
    let buttonStyle = " px-3 py-0.5 rounded-lg text-sm ";
    let inactiveStyle = " cursor-default bg-zinc-500 ";
    let activeStyle = " cursor-pointer hover:bg-opacity-80 transition active:scale-90 ";
    let decrementStyle = inactiveStyle;
    let incrementStyle = inactiveStyle;


    const [quantity, setQuantity] = useState(1);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("produce");

    const handleNameChange = (event) => { setName(event.target.value); }
    const handleCategoryChange = (event) => { setCategory(event.target.value); }
    

    const handleSubmit = (event) => {  
        event.preventDefault(); 

        let item = {
            itemName: name,
            itemQuantity: quantity,
            itemCategory: category
        };

        console.log(item);

        alert(`
            Added Item:

            Name: ${item.itemName}
            Quantity: ${item.itemQuantity}
            Category: ${item.itemCategory}`);

        setName("");
        setQuantity(1);
        setCategory("produce");
    }


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

    if (quantity > 1) {
        decrementStyle = activeStyle + " bg-red-600 ";
    }

    if (quantity < 20) {
        incrementStyle = activeStyle + " bg-green-600 ";
    }


    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-5 rounded-3xl bg-gray-800">


            <input type="text" placeholder="Item Name" required value={name} onChange={handleNameChange} className={"px-2 py-3" + boxStyle} />

            <div className="flex gap-8">
                <div className={"basis-1/2 flex justify-between items-center gap-6 px-2 py-1" + boxStyle}>
                    <p className="p-2">{quantity}</p>
                    <div className="flex gap-2 text-xl">
                        <button type="button" onClick={decrement} className={buttonStyle + decrementStyle}>-</button> 
                        <button type="button" onClick={increment} className={buttonStyle + incrementStyle}>+</button>
                    </div>
                </div>

                <select value={category} onChange={handleCategoryChange} className={"basis-1/2 p-2" + boxStyle}>
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

            <button type="submit" className="p-1 mt-1 rounded-lg text-2xl bg-green-600 shadow-lg shadow-gray-900 hover:bg-opacity-80">+</button>
        </form>
    )
}
