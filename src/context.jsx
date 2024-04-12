import React,{useContext,useEffect} from "react";
import axios from 'axios';
const AppContext=React.createContext()
//https://www.themealdb.com/api.php/
const allMealsUrl='https://www.themealdb.com/api/json/v1/1/search.php?s=a'
const randomMealUrl='https://www.themealdb.com/api/json/v1/1/random.php'

const AppProvider=({children})=>{
    const fetchMeals=async(url)=>{
        try{
            const {data} = await axios(url)
            console.log(data)
        }
        catch(err){
            console.log(err.response)
        }
    }
    useEffect(()=>{
            
        fetchMeals(allMealsUrl)
    },[])
    return <AppContext.Provider value={{name:"andrew",role:"full stack dev"}}>
                    {children}
            </AppContext.Provider>
}

export const useGlobalContext=()=>{
    return useContext(AppContext)
}

export  {AppContext,AppProvider}