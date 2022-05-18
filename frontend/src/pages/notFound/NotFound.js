import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'

const NotFoundPage = () => {
    return (
        <div className='not-found-container'>
            <section className='content'>
                <h1>404 Page not found</h1>
                <p>
                    <Link to='/'>Go to the Homepage</Link>
                </p>
            </section>
        </div>
    );
};

export default NotFoundPage;