const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const tokenHelper = require('../utils/generateJwt');

/**
 * @desc    Register new user
 * @route   POST /api/users
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Missing required fields.');
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists.');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        optOut: false,
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            optOut: user.optOut,
            token: tokenHelper.generateJwt(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data.');
    }
});

/**
 * @desc    Authenticate a user
 * @route   POST /api/users/login
 * @access  Public
 */
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            optOut: user.optOut,
            token: tokenHelper.generateJwt(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid credentials.');
    }
});

/**
 * @desc    Update user data
 * @route   PUT /api/users
 * @access  Private
 */
 const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(400);
        throw new Error('User not found.');
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
    });

    res.status(200).json({
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        optOut: updatedUser.optOut,
        token: tokenHelper.generateJwt(updatedUser._id),
    });
});

/**
 * @desc    Get user data
 * @route   GET /api/users/me
 * @access  Private
 */
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    getMe,
};