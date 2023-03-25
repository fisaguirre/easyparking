import React from 'react';
import './Card.css';

function Card({ tittle, imageurl, body }) {
    return (
        /*
        <div className="image-container">
            <img src={imageurl} alt='' />
        </div>
        <div className='card-container'>
            <div className='card-tittle'>
                <h3>{tittle}</h3>
            </div>
            <div className='card-body'>
                <p>{body}</p>
            </div>

        </div>
         */
        <div className="card-container">

            <div className='row'>
                <div className='col-md-12'>
                    <button
                        type="button"
                        className="Button"
                    >1
                    </button>
                    <button
                        type="button"
                        className="Button"
                    >2
                    </button>
                    <button
                        type="button"
                        className="Button"
                    >Lunes
                    </button>
                    <button
                        type="button"
                        className="Button"
                    >Martes
                    </button>
                    <button
                        type="button"
                        className="Button"
                    >Miercoles
                    </button>

                </div>
            </div>

        </div>
    );
}
export default Card;
