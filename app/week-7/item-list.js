"use client"

import { useState } from "react";
import Item from "./item";


export default function ItemList({items}) {

    //Styles 
    let buttonStyle = "  min-w-20 px-2 py-3 rounded-xl shadow-gray-900 shadow-sm w-max text-sm ";
    let inactiveStyle = " cursor-pointer bg-gray-600 ";
    let activeStyle = " cursor-default hover:bg-opacity-80 bg-zinc-800 text-gray-300 ";


    const [sortBy, setSortBy] = useState("name");

    let group = false;

    let itemsCopy;
    
    // Sorting items based on the sortBy state
    if (sortBy === "name") {
        itemsCopy = items;
        itemsCopy.sort((a, b) => a.name.localeCompare(b.name));
    } 

    else if (sortBy === "category") {
        itemsCopy = items;
        itemsCopy.sort((a, b) => a.category.localeCompare(b.category));
    }

    else if (sortBy === "grouped category") {
        itemsCopy = items;
        itemsCopy.sort((a, b) => a.category.localeCompare(b.category));
        group = true;
    }

    // Function to handle the change in sorting
    const handleSortChange = (event) => {
        let currentSortBy = sortBy;
        if (currentSortBy !== event.target.value) {
            setSortBy(event.target.value);
        }
    }

    // Button component with conditional rendering
    // The onClick event handler is passed as a prop
    function Button({ name, isActive }) {
        if (isActive) {
            return  <button onClick={handleSortChange} value={name} className={buttonStyle + activeStyle}>{name}</button> ;
        }

        return <button onClick={handleSortChange} value={name} className={buttonStyle + inactiveStyle}>{name}</button> ;
    }

    // ShoppingList component with conditional rendering
    function ShoppingList({isGrouped}){

        // If sorting by name or category: render the items as a simple list
        if (!isGrouped){
            return(
                <ul className="flex flex-col gap-5">
                    {itemsCopy.map((item, index) => (
                        <Item key={index} name={item.name} quantity={item.quantity} category={item.category} />
                    ))}
                </ul>
            )
        }
        

        let categories = ["bakery", "beverages", "canned goods", "dairy", "dry goods", "frozen foods", "household", "meat", "other", "produce", "snacks"];

        // If sorting by grouped category: render the items as a grouped list
        return(
            <ul className="flex flex-col gap-5">
                {categories.map((category, index) => (
                    <li key={index}>
                        
                        <div className="text-lg -ml-4 mb-2">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </div>

                        <ul className="flex flex-col gap-5">
                            {itemsCopy.filter((item) => item.category == category).map((item, idx) => (
                                <Item key={idx} name={item.name} quantity={item.quantity} category={item.category} />
                            ))}
                        </ul>

                    </li>
                ))}
            </ul>
        )
    }

    return(
        <div>
            <div className="flex gap-2 items-center mb-6 justify-between">
                <div className="whitespace-nowrap text-sm">Sort by:</div>
                <Button name="name" isActive={sortBy === "name"} />
                <Button name="category" isActive={sortBy === "category"} />
                <Button name="grouped category" isActive={sortBy === "grouped category"} />
            </div>
            <div className="p-6 rounded-lg bg-gray-800">
                <ShoppingList isGrouped={group} />
            </div>
        </div>
    )
}
