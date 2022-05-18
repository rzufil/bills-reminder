import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const { name, email, subject, message } = formData;

    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('/api/sendEmail/', { ...formData });
        if (response.data.status === 'error') {
            toast.error(response.data.message);
        } else {
            toast.success(response.data.message);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }
    };

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className='contact-container'>
            <section className='contact-header'>
                <h1>Contact Us</h1>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='name'>Full Name</label>
                        <input
                            type='text'
                            className='form-control'
                            id='name'
                            name='name'
                            value={name}
                            placeholder='Enter your name'
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            name='email'
                            value={email}
                            placeholder='Enter your email'
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='subject'>Subject</label>
                        <input
                            type='text'
                            className='form-control'
                            id='subject'
                            name='subject'
                            value={subject}
                            placeholder='Enter subject'
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='message'>Message</label>
                        <textarea
                            className='form-control'
                            id='message'
                            name='message'
                            value={message}
                            rows='3'
                            placeholder='Enter your message'
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <Button
                            variant='secondary'
                            type='submit'
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Contact;