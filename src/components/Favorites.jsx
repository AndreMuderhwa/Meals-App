import { useGlobalContext } from "../context";
const Favorites=()=>{
    const {favorites,selectMeal,removeFromFavorites}=useGlobalContext();
    return (
    <section className="favorites">
        <div className="favorites-content">
            <h5>Favorites</h5>
            <div className="favorites-container">
                {favorites.map((item)=>{
                    const {idMeal, strMealThumb: image}=item;
                    return <div className="favorite-item" key={idMeal}>
                        <img src={image} className="favorites-img img" alt="" onClick={()=>selectMeal(idMeal,true)}/>
                        <button className="remove-btn" onClick={()=>removeFromFavorites(idMeal)}>Remove</button>

                    </div>
                })}
            </div>

        </div>
    </section>
    )
}
export default Favorites;