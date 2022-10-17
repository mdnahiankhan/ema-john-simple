import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';

const Order = () => {
    const { products, initialcart } = useLoaderData();
    const [cart, setcart] = useState(initialcart);

    const removeId = (id) => {
        const remaining = cart.filter(product => product.id !== id);
        setcart(remaining);
        removeFromDb(id);
    };
    const clearCart = () => {
        setcart([]);
        deleteShoppingCart()
    };
    return (
        <div className='shop-container'>
            <div className='orders-container'>
                {
                    cart.map(product => <ReviewItems
                        key={product.id}
                        product={product}
                        removeId={removeId}
                    ></ReviewItems>)
                },
                {
                    cart.length === 0 && <h2>There is no items here.Please <Link to='/shop'>Shop more</Link></h2>
                }
            </div>
            <div className='cart-container'>
                <Cart clearCart={clearCart} cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Order;