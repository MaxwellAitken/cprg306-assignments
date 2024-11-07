"use client"

import { useState } from "react";
import { useUserAuth } from "../_utils/auth-context"
import Link from "next/link";
import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items";
import MealIdeas from "./meal-ideas";
import Header from "../header";


export default function Page() {

    const {user} = useUserAuth();

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
        <div>
            <Header />
            <main>
                {user ?
                (
                    <div className="flex gap-16 px-12 py-8">
                        <div className="flex-1 flex flex-col gap-8">
                            <NewItem onAddItem={handleAddItem} />
                            <ItemList onItemSelect={handleItemSelect} items={items} />
                        </div>
                        <div className="flex-1">
                            <MealIdeas ingredient={selectedItemName} />
                        </div>
                    </div>
                ) :
                (
                    <div className="flex flex-col items-start gap-6 mx-12 my-10">
                        <p>You are not signed in</p>
                        <Link className="px-6 py-4 rounded-lg bg-gray-800 drop-shadow-2xl hover:cursor-pointer hover:bg-gray-500" href="/week-9">Return to sign in</Link>
                    </div>
                )}
            </main>
        </div>
    );
}