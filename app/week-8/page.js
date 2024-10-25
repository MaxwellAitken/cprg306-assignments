"use client"

import { useState } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items";
import MealIdeas from "./meal-ideas";

// styles
let headerStyle = "sticky z-50 top-0 flex justify-between items-center py-4 px-8 bg-gray-900 bg-opacity-95";

export default function Page() {

    // state variables
    // items: list of items from items.js
    const [items, setItems] = useState(itemsData);

    // selectedItemName: name of the clicked item
    const [selectedItemName, setSelectedItemName] = useState("");

    // functions
    // handleAddItem: adds a new item to the list
    const handleAddItem = (event) => {
        const newList = items.concat(event);
        
        setItems(newList);
    }

    // handleItemSelect: receives the name of the clicked item and sets the state variable
    function handleItemSelect (name){

        // remove emojis, quantities and commas
        let newName = name.replace(
            /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,''
        )
        .trim()
        .split(',')[0];
        
        setSelectedItemName(newName);
    }
    

    return (

        <main>
            <div className={headerStyle}>
                <h1 className="text-4xl font-bold">Shopping List</h1>
                <a href="https://github.com/MaxwellAitken/cprg306-assignments" target="_blank" className="hover:underline">Maxwell Aitken</a>
            </div>

            <div className="flex gap-16 px-12 py-8">

                <div className="flex-1 flex flex-col gap-8">
                    <NewItem onAddItem={handleAddItem} />
                    <ItemList onItemSelect={handleItemSelect} items={items} />
                </div>
                
                <div className="flex-1">
                    <MealIdeas ingredient={selectedItemName} />
                </div>

            </div>
        </main>
    );
}