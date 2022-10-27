const asyncHandler = require('express-async-handler');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * @desc    Send email
 * @route   POST /api/sendEmail
 * @access  Public
 */
const sendEmail = asyncHandler(async (req, res) => {
    if (req.body.name?.length === 0 || !req.body.email?.length === 0 || !req.body.subject?.length === 0 || !req.body.message?.length === 0) {
        res.status(200).json({ 'status': 'error', 'message': 'Missing required fields.' });
        return;
    }

    const emailText = `Name: ${req.body.name}\nEmail: ${req.body.email}\nSubject: ${req.body.subject}\nMessage: ${req.body.message}\n`;
    const msg = {
        to: process.env.SENDGRID_SENDER_EMAIL,
        from: process.env.SENDGRID_SENDER_EMAIL,
        subject: 'New Contact Form Submission',
        text: emailText,
    };

    try {
        sgMail.send(msg);
        res.status(200).json({ 'status': 'success', 'message': 'Thank you for your inquiry, we will get back to you shortly!' });
    } catch (error) {
        res.status(200).json({ 'status': 'success', 'message': error.message });
    }
});

module.exports = { sendEmail };