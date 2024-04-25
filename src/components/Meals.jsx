import { BsHandThumbsUpFill } from "react-icons/bs";
import {useGlobalContext} from '../context';
import Loader from "../loader/Loader";

const Meals=()=>{
    const { meals, loading }=useGlobalContext()

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
                            <img src={image} className='img' alt=''/>
                            <footer>
                                <h5>{title}</h5>
                                <button className='like-btn'><BsHandThumbsUpFill/></button>
                            </footer>
                                

                        </article>
                    })
                }
            </section>
)
}
export default Meals;

 