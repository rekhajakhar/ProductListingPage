
import {useState} from "react";
import {PRODUCTS} from "../data/mockData";
import Catalogue from "./Catalogue";
import Cart from "./Cart";

const CartContainer = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart( (prev) => {
             const exists = cart.find( (c) => c.id === product.id);
            if(exists) {
                return prev.map( (p) => p.id === product.id ? {...p, qty: p.qty+1} : p);
            }
            return [...prev, {...product, qty: 1}];
        });
    }
    console.log(cart);
    const totalItems = cart.reduce( (sum, p) => sum + p.qty, 0);
    const changeQty = (id, delta) => {
        setCart( (prev) => 
            prev.map( (p) => p.id === id ? {...p, qty: p.qty + delta} : p)
            .filter( (p) => p.qty > 0)
        );
    };
    const totalAmount = cart.reduce( (sum, p) => sum + p.qty * p.price, 0);
    return (
        <div className="MainContainer">
            <Catalogue products={PRODUCTS} cart={cart} addToCart={addToCart}/>
            <Cart cart={cart} totalItems={totalItems} changeQty={changeQty} totalAmount={totalAmount}/>
        </div>
    );
};

export default CartContainer;