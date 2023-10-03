import React,{useReducer} from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import { useTheme } from '../utils/ThemeContext';
import { reducer } from '../utils/reducers';
import { TOGGLE_THEME } from '../utils/actions';
// import '../index.css'

const Home = () => {
  const initialState = useTheme();

  // Set up our useReducer hook. Accepts two arguments - the reducer and an initial state
  const [state, dispatch] = useReducer(reducer, initialState);

  const themeStyles = {
    background: state.darkTheme
      ? 'white'
      : '#232F3E',
    height:'300vh',
    width:'calc(100% - 0px) !important',
    color: state.darkTheme ? 'black' : 'white',
  };

  return (
    <div className="container" style={themeStyles}>
      <button
        id="button"
        // To change the theme we invoke dispatch and pass in an object containing action type and payload
        onClick={() =>
          dispatch({ type: TOGGLE_THEME, payload: state.darkTheme })
        }
        className="btn"
        type="button"
      >
        Toggle dark theme
      </button>
      {/* darkTheme: {state.darkTheme.toString() ?  <i className='orange sun icon'></i> : <i className='blue moon icon'></i>}  */}
      {/* darkTheme: {state.darkTheme.toString()} */}
     
      <CategoryMenu />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;
