"use client"

import { useState } from "react";
import Item from "./item";


export default function ItemList({items, onItemSelect}) {

    //Styles 
    let buttonStyle = "  h-10 px-3 py-2 rounded-lg drop-shadow-2xl shadow-gray-800 whitespace-nowrap ";
    let inactiveStyle = " cursor-pointer bg-gray-800 hover:bg-gray-500 ";
    let activeStyle = " cursor-default bg-gray-500 ";

    // State variable to store the current sorting method
    const [sortBy, setSortBy] = useState("name");
    let itemsCopy = [];
    let group = false;
    
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
        if (currentSortBy !== event.target.value) setSortBy(event.target.value);
    }

    // Button component with conditional rendering
    function Button({ name, isActive }) {
        if (isActive) {
            return  <button onClick={handleSortChange} value={name} className={buttonStyle + activeStyle}>{name}</button> ;
        }
        return <button onClick={handleSortChange} value={name} className={buttonStyle + inactiveStyle}>{name}</button> ;
    }

    // ShoppingList component with conditional rendering
    function ShoppingList({isGrouped}){

        // If sorting by name or category: render the items as a normal list
        if (!isGrouped){
            return(
                <ul className="flex flex-col gap-4">
                    {itemsCopy.map((item, index) => (
                        <Item key={index} name={item.name} quantity={item.quantity} category={item.category} onSelect={onItemSelect} />
                    ))}
                </ul>
            )
        }
        
        // If sorting by grouped category: render the items as a grouped list
        let categories = ["bakery", "beverages", "canned goods", "dairy", "dry goods", "frozen foods", "household", "meat", "other", "produce", "snacks"];
        return (
            <ul className="flex flex-col gap-6">
                {categories.map((category, index) => {
                    if (itemsCopy.filter((item) => item.category === category).length > 0) {
                        return (
                            <li key={index}>
                                <div className="text-lg -ml-1.5 mb-1">
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </div>
                                <ul className="flex flex-col gap-3">
                                    {itemsCopy
                                        .filter((item) => item.category === category)
                                        .map((item, idx) => (
                                            <Item key={idx} name={item.name} quantity={item.quantity} category={item.category} onSelect={onItemSelect} />
                                        ))}
                                </ul>
                            </li>
                        );
                    }
                    return null;
            }   )}
            </ul>
        );
    }


    return(
        <div className="pt-8 border-t-4 border-gray-900 border-opacity-95">
            {
                items.length === 0 ?
                (
                    <h1 className="text-xl text-center">Add an item to get started</h1>
                ) :
                (
                    <div>
                        <div className="flex gap-6 items-center mb-4 justify-center">
                            <h3 className="whitespace-nowrap text-lg">Sort by:</h3>
                            <div className="flex gap-3 justify-between">
                                <Button name="name" isActive={sortBy === "name"} />
                                <Button name="category" isActive={sortBy === "category"} />
                                <Button name="grouped category" isActive={sortBy === "grouped category"} />
                            </div>
                        </div>
                        <div className="mx-4 px-4 py-3 rounded-lg bg-gray-900 bg-opacity-95">
                            <ShoppingList isGrouped={group} />
                        </div>
                    </div>
                )
            }
        </div> 
    );
}
