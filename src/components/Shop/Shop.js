import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getSotredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
    const products = useLoaderData();
    const [cart, setcart] = useState([]);

    const clearCart = () => {
        setcart([]);
        deleteShoppingCart()
    };

    useEffect(() => {
        const storedCart = getSotredCart();
        const savecart = [];
        for (const id in storedCart) {
            const addedproduct = products.find(product => product.id === id);
            if (addedproduct) {
                const quantity = storedCart[id];
                addedproduct.quantity = quantity;
                savecart.push(addedproduct);
            }
        }
        setcart(savecart);
    }, [products])

    const handeaddTocart = (selectedproduct) => {
        console.log(selectedproduct);
        let newcart = [];
        const exist = cart.find(product => product.id === selectedproduct.id);
        if (!exist) {
            selectedproduct.quantity = 1;
            newcart = [...cart, selectedproduct]
        }
        else {
            const rest = cart.filter(product => product.id !== selectedproduct.id);
            exist.quantity = exist.quantity + 1;
            newcart = [...rest, exist];

        }
        setcart(newcart);
        addToDb(selectedproduct.id);
    }
    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handeaddTocart={handeaddTocart}
                    ></Product>)
                }
            </div>
            <div className='cart-container'>
                <Cart clearCart={clearCart} cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;