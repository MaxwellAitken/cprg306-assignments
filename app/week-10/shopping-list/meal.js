"use client"

import { useEffect, useState } from "react";

export default function Meal({meal, selectedIngredient}){
    
    // styles
    let mealStyle = " px-3 py-2 rounded-lg bg-gray-800 drop-shadow-2xl ";
    let unexpandedStyle = " hover:bg-gray-500 hover:cursor-pointer ";
    let headerStyle = "text-lg font-bold";

    const [expanded, setExpanded] = useState(false);
    const [ingredients, setIngredients] = useState([]);

    async function fetchIngredients({mealId}) {
        try {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
            );
            const mealMatch = await response.json();
            return mealMatch.meals;
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }

    async function loadIngredients(){
        let loadedMeal = await fetchIngredients({mealId: meal.idMeal});
        if (loadedMeal != null && loadedMeal != undefined){
            let thisIngredients = loadedMeal[0];
            
            thisIngredients = Object.keys(thisIngredients)
                .filter(
                    key => key.includes("strIngredient") && thisIngredients[key] != "" && thisIngredients[key] != null
                )
                .map(
                    key => (thisIngredients[key] + 
                    (thisIngredients[key.replace("Ingredient", "Measure")] != " " ? (" - " + thisIngredients[key.replace("Ingredient", "Measure")])  : "" ) )
                );
            setIngredients(thisIngredients);
        }
        else setIngredients(null);
    }

    useEffect (() => { 
        if (expanded === true) loadIngredients();
    }, [expanded]);
    


    function IngredientsList(){
        if (expanded == false){
            return null;
        }
        if (ingredients == null){
            return <h4>Ingredients not found</h4>;
        }
        else {
            return (
                <div className="mt-6">
                    <h4>Ingredients needed:</h4>
                    <ul className="flex flex-col gap-2 ml-6 mt-2 list-disc">
                        {ingredients.map((ingredient, index) => (
                            <li className="" key={index}>
                                {
                                    ingredient.toLowerCase().includes(selectedIngredient.toLowerCase() + " - ") ? 
                                    (
                                        <div>
                                            <span className="underline">{ingredient.split(" - ")[0]}</span>
                                            <span>{ingredient.toLowerCase().split(selectedIngredient.toLowerCase())[1]}</span>
                                        </div>
                                    ) :
                                    (
                                        <span>{ingredient}</span>
                                    )
                                }
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }

    function handleExpand(){
        setExpanded(!expanded);
    }

    if (expanded === true){
        unexpandedStyle = "";
        headerStyle = " hover:cursor-pointer ";
    }

    return(
        <li onClick={handleExpand} className={mealStyle + unexpandedStyle}>
            <h3 className={"text-lg font-bold " + headerStyle}>{meal && meal.strMeal}</h3>
            {ingredients && <IngredientsList />}
        </li>
    )
}
