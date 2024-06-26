import './App.css';
import Favorites from './components/Favorites';
import Meals from './components/Meals';
import Modals from './components/Modals';
import Search from './components/Search';
import { useGlobalContext } from './context';

function App() {
  const {showModal, favorites }=useGlobalContext()
  return (
      <main>
        <Search/>
        { favorites.length>0 && <Favorites/>}
        <Meals/>
       {showModal && <Modals/>}
      </main>
  );
}

export default App;
