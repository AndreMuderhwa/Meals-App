import { BsHandThumbsUpFill } from "react-icons/bs";
import {useGlobalContext} from '../context';
import Loader from "../loader/Loader";

const Meals=()=>{
    const { meals, loading, selectMeal,addToFavorites }=useGlobalContext()

    if(loading){
        return (
            <section className="section">
                <Loader/>
            </section>
        )
    }
    if(meals.length < 1){
        return <section className="section">
            <h4>No meals found ... </h4>
        </section>
    }

    return (
            <section className="section-center">
                {
                    meals.map((meal)=>{
                        const {idMeal,strMeal:title,strMealThumb:image}=meal
                        return <article key={idMeal} className='single-meal'>
                            {/* ici on a appele la fonction selectMeal as arrow function pour eviter que chaque fois que l'on va load ce component on puisse appeler la fonction */}
                            <img src={image} className='img' alt='' onClick={()=> selectMeal(idMeal)}/>
                            <footer>
                                <h5>{title}</h5>
                                <button className='like-btn' onClick={()=>addToFavorites(idMeal)}><BsHandThumbsUpFill/></button>
                            </footer>
                                

                        </article>
                    })
                }
            </section>
)
}
export default Meals;

 