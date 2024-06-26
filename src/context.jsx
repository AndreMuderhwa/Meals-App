import React,{useContext,useEffect, useState} from "react";
import axios from 'axios';
const AppContext=React.createContext()
//https://www.themealdb.com/api.php/
const allMealsUrl='https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl='https://www.themealdb.com/api/json/v1/1/random.php'


const getFavoriteFromLocalStorage=()=>{
    let favorites =localStorage.getItem('favorites');
    if(favorites){
        favorites=JSON.parse(localStorage.getItem('favorites'));
    }
    else{
        favorites=[]
    }
    return favorites
}

const AppProvider=({children})=>{
    const [loading, setLoading]=useState(false);
    const [meals, setMeals]=useState([]);
    const [seachTerm,setSeachTerm]=useState('');
    const [showModal, setShowModal]=useState(false);
    const [selectedMeal, setSelectedMeal]=useState(null);
    const [favorites, setFavorites]=useState(getFavoriteFromLocalStorage());

    const fetchMeals=async(url)=>{
        setLoading(true)
        try{
            const {data} = await axios(url)
            if(data.meals){
            setMeals(data.meals)
        }
        else{
            setMeals([])
        }
        }
        catch(err){
            console.log(err.response)
        }
        setLoading(false)
    }

    const fetchRandomMeals=()=>{
        fetchMeals(randomMealUrl)
    }

    const selectMeal=(idMeal,favoriteMeal)=>{
        let meal;
        if(favoriteMeal){
            meal=favorites.find((meal)=>meal.idMeal === idMeal);
        }
        else{
            meal=meals.find((meal)=>meal.idMeal === idMeal);
        }
        setSelectedMeal(meal)
        setShowModal(true)
    }
    const closeModal=()=>{
        setShowModal(false)
    }
    const addToFavorites=(idMeal)=>{
        const meal=meals.find((meal)=>meal.idMeal === idMeal)
        const alReadyFavorites=favorites.find((meal)=> meal.idMeal === idMeal)
        if(alReadyFavorites) return
        const updatedFavorites=[...favorites,meal];
        setFavorites(updatedFavorites)
        localStorage.setItem('favorites',JSON.stringify(updatedFavorites))
    }

    const removeFromFavorites=(idMeal)=>{
        const updatedFavorites=favorites.filter((meal)=>meal.idMeal !== idMeal)
        setFavorites(updatedFavorites)
        localStorage.setItem('favorites',JSON.stringify(updatedFavorites))
    }





    //It is not good to use multiple useEffect in the component 
    useEffect(()=>{
        fetchMeals(allMealsUrl)
    },[])

    useEffect(()=>{
        if(!seachTerm) return
        fetchMeals(`${allMealsUrl}${seachTerm}`)
    },[seachTerm])
    return <AppContext.Provider value={{loading, meals,setSeachTerm, fetchRandomMeals, showModal, selectedMeal, selectMeal, closeModal,
                                favorites,addToFavorites, removeFromFavorites }}>
                    {children}
            </AppContext.Provider>
}

export const useGlobalContext=()=>{
    return useContext(AppContext)
}

export  {AppContext,AppProvider}