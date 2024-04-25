import React,{useContext,useEffect, useState} from "react";
import axios from 'axios';
const AppContext=React.createContext()
//https://www.themealdb.com/api.php/
const allMealsUrl='https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealUrl='https://www.themealdb.com/api/json/v1/1/random.php'

const AppProvider=({children})=>{
    const [loading, setLoading]=useState(false);
    const [meals, setMeals]=useState([]);
    const [seachTerm,setSeachTerm]=useState('');

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
    //It is not good to use multiple useEffect in the component 
    useEffect(()=>{
        fetchMeals(allMealsUrl)
    },[])

    useEffect(()=>{
        if(!seachTerm) return
        fetchMeals(`${allMealsUrl}${seachTerm}`)
    },[seachTerm])
    return <AppContext.Provider value={{loading, meals,setSeachTerm, fetchRandomMeals}}>
                    {children}
            </AppContext.Provider>
}

export const useGlobalContext=()=>{
    return useContext(AppContext)
}

export  {AppContext,AppProvider}