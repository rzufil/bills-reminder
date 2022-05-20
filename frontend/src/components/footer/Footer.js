import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube, FaCalendarCheck } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    const { user } = useSelector((state) => state.auth);

    const scrollToTop = () => {
        window.scroll({top: 0, left: 0, behavior: 'smooth'});
    }

    return (
        <footer className='page-footer font-small blue pt-4 bg-dark shadow'>
            <div className='container text-center text-md-left'>
                <div className='row'>
                    <div className='col-md-6 mt-md-0 mt-3'>
                        <span className='icon'>
                            <FaCalendarCheck size={50} />
                        </span>
                        <h5 className='text-uppercase'>Bills Reminder</h5>
                        <p>Get email notifications when your bills are due.</p>
                    </div>
                    <hr className='clearfix w-100 d-md-none pb-0' />
                    <div className='col-md-3 mb-md-0 mb-3'>
                        <h5 className='text-uppercase'>Links</h5>
                        <ul className='list-unstyled'>
                            <li>
                                <Link to='/' onClick={() => scrollToTop()}>Homepage</Link>
                            </li>
                            {user ? (
                                <li>
                                    <Link to='/dashboard' onClick={() => scrollToTop()}>Dashboard</Link>
                                </li>
                            ) : (
                                <>
                                    <li>
                                        <Link to='/login' onClick={() => scrollToTop()}>Login</Link>
                                    </li>
                                    <li>
                                        <Link to='/register' onClick={() => scrollToTop()}>Register</Link>
                                    </li>
                                </>
                            )}
                            <li>
                                <Link to='/about' onClick={() => scrollToTop()}>About</Link>
                            </li>
                            <li>
                                <Link to='/contact' onClick={() => scrollToTop()}>Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                    <div className='col-md-3 mb-md-0 mb-3'>
                        <h5 className='text-uppercase'>Social Media</h5>
                        <ul className='list-unstyled'>
                            <li><a href='#'><FaInstagram /> Instagram</a></li>
                            <li><a href='#'><FaFacebook /> Facebook</a></li>
                            <li><a href='#'><FaTwitter /> Twitter</a></li>
                            <li><a href='#'><FaYoutube /> Youtube</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='footer-copyright text-center py-3'>
                © {new Date().getFullYear()} Copyright
            </div>
        </footer>
    );
};

export default Footer;