import React from 'react';
import './About.css';

const About = () => {
    return (
        <>
            <section className='about-hero'>
                <div className='about-hero-image'>
                    <div className='about-hero-text'>
                        <h1>About Us</h1>
                    </div>
                </div>
            </section>
            <section className='content'>
                <div className='about-container'>
                    <p><b>Bills Beminder</b> is a web app to remind you to pay your bills on time. You can create an account and start creating reminders.</p>
                    <p>When your bills are due, you will receive an email notification to remind you to pay your bills.</p>
                    <p>And it is <b>FREE</b> to use.</p>
                </div>
            </section>
        </>
    );
};

export default About;