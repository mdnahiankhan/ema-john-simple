import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import "./ReviewItem.css"
const ReviewItems = ({ product, removeId }) => {
    const { id, name, price, quantity, img, shipping } = product;
    return (
        <div className='review-item'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className="review-details-container">
                <div className="review-details">
                    <p>{name}</p>
                    <p><small>shipping:${shipping}</small></p>
                    <p><small>price:${price}</small></p>
                    <p>Quantity:{quantity}</p>
                </div>
                <div className="delete-container">
                    <button onClick={() => removeId(id)} className='btn-delete'>
                        <FontAwesomeIcon className='delete-items' icon={faTrashAlt}></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewItems;