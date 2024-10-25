"use client"

import { useState } from "react";
import ItemList from "./item-list";
import NewItem from "./new-item";
import itemsData from "./items";


export default function Page() {

    // State variable to store the list of items from the json file
    const [items, setItems] = useState(itemsData);

    // Function to add a new item to the list
    const handleAddItem = (event) => {
        const newList = items.concat(event);
        
        setItems(newList);
    }

    return (
        <main className="p-6 flex justify-center">

            <div className="flex flex-col items-center gap-12 p-6 px-16 rounded-lg bg-gray-900">
                
                <h1 className="text-4xl font-bold">Shopping List</h1>

                <div className="flex items-start gap-12">

                    <div className="flex text-center flex-col gap-4 basis-1/2 py-4">
                        <span>Add Items:</span>
                        <div className=" rounded-lg bg-gray-800">
                            <NewItem onAddItem={handleAddItem} />
                        </div>
                    </div>

                    <div className="basis-1/2">
                        <ItemList items={items} />
                    </div>
                </div>
                
            </div>

        </main>
    );
}