import React from 'react';
import { FaUser, FaEdit, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import bills from '../../assets/bills2.webp';
import './Home.css';

const Home = () => {
    return (
        <>
            <section className='hero'>
                <div className='hero-image'>
                    <div className='hero-text'>
                        <h1>Bills Reminder</h1>
                        <p>Never forger to pay your bills</p>
                        <p>Receive email notifications when your bills are due</p>
                    </div>
                </div>
            </section>
            <section className='content mt-3 mb-3'>
                <div className='container'>
                    <div className='row pb-3'>
                        <div className='col-12 text-center'>
                            <h2>
                                Getting bill reminders is easy
                            </h2>
                        </div>
                    </div>
                    <div className='row m-6'>
                        <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                            <div className='mb-3'><FaUser size={100} /></div>
                            <p><b>Register</b></p>
                            <p>Create a free account</p>
                        </div>
                        <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                            <div className='mb-3'><FaEdit size={100} /></div>
                            <p><b>Create Reminders</b></p>
                            <p>Add bill reminders</p>
                        </div>
                        <div className='col-sm-12 col-md-4 col-lg-4 col-xl-4'>
                            <div className='mb-3'><FaEnvelope size={100} /></div>
                            <p><b>Receive Notifications</b></p>
                            <p>Receive emails when your bills are due</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='middle'>
                <div className='container'>
                    <div className='cta row p-5 mx-auto'>
                        <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6 text-center'>
                            <div>Click here to access your account</div>
                            <div className='d-flex justify-content-center mt-3 mb-2'>
                                <Link to='/login'>
                                    <Button
                                        className='btn cta-button'
                                    >
                                        <b>Login</b>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className='col-sm-12 col-md-6 col-lg-6 col-xl-6 text-center'>
                            <div>Click here to create an account</div>
                            <div className='d-flex justify-content-center mt-3 mb-2'>
                                <Link to='/register'>
                                    <Button
                                        className='btn cta-button'
                                    >
                                        <b>Register</b>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='content-footer container-fluid'>
                <div className='row align-items-center'>
                    <div className='free-col col-sm-12 col-md-6 col-lg-6 col-xl-6'>
                        <img className='bills-img' alt='Paying Bills' src={bills} />
                    </div>
                    <div className='free-col col-sm-12 col-md-6 col-lg-6 col-xl-6 text-center pt-5'>
                        <h2 className='mb-5'>Bills reminder is FREE</h2>
                        <ul className='free-list'>
                            <li>No charges</li>
                            <li>No subscriptions</li>
                            <li>No credit card information required</li>
                            <li>100% free</li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;