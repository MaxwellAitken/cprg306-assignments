"use client"

import { useEffect, useState } from "react";
import Meal from "./meal";


export default function MealIdeas({ingredient}){

    // state variable to store meal ideas
    const [meals, setMeals] = useState([]);

    // fetch meal ideas from api based on ingredient
    async function fetchMealIdeas({ingredient}) {
        try {
            const response = await fetch(
                `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
            );
            const mealMatches = await response.json();
            return mealMatches.meals;
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }

    // function to load meals from the fetch function and store them in the state variable
    async function loadMealIdeas(){
        let loadedMeals = await fetchMealIdeas({ingredient});
        if (loadedMeals != null && loadedMeals.length > 0){
            let thisMeals = [];
            for (let i = 0; i < loadedMeals.length; i++){
                thisMeals.push(loadedMeals[i]);
            }
            setMeals(thisMeals);
        }
        else setMeals(null); // if no meals found set meals to null
    }

    useEffect (() => { 
        if (ingredient != null && ingredient != "") loadMealIdeas();
    }, [ingredient]);
    
    // function to conditionally render the list of meals
    function MealList(){
        if (meals == null){
            return <h3>No meal ideas found for {ingredient} :(</h3>;
        }
        else if (meals.length === 0){
            return<h3>Select an item to see meal ideas</h3>;
        }
        return (
            <div>
                <h3>Here are some meal ideas using {ingredient}:</h3>
                <ul className="mt-2 flex flex-col gap-4">
                    {meals.map( (thisMeal, index) => <Meal key={index} meal={thisMeal} selectedIngredient={ingredient} /> )}
                </ul>
            </div>
        );
    }

    return(
        <div>
            <h2 className="text-xl font-bold mb-8">Meal Ideas</h2>
            <MealList />
        </div>
    )
}