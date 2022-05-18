const asyncHandler = require('express-async-handler');
const Bill = require('../models/billModel');

/**
 * @desc    Get bills
 * @route   GET /api/bills
 * @access  Private
 */
const getBills = asyncHandler(async (req, res) => {
    const bills = await Bill.find({ user: req.user.id });
    res.status(200).json(bills);
});

/**
 * @desc    Set bill
 * @route   POST /api/bills
 * @access  Private
 */
const setBill = asyncHandler(async (req, res) => {
    if (!req.body.name || !req.body.dueDate || !req.body.repeat || !req.body.category) {
        res.status(400);
        throw new Error('Missing required fields.');
    }

    const bill = await Bill.create({
        name: req.body.name,
        repeat: req.body.repeat,
        dueDate: req.body.dueDate,
        dueMonth: req.body.dueMonth,
        notes: req.body.notes,
        category: req.body.category,
        user: req.user.id
    });

    res.status(200).json(bill);
});

/**
 * @desc    Update bill
 * @route   PUT /api/bills/:id
 * @access  Private
 */
const updateBill = asyncHandler(async (req, res) => {
    const bill = await Bill.findById(req.params.id);

    if (!bill) {
        res.status(400);
        throw new Error('Bill not found.');
    }

    if (!req.user) {
        res.status(401);
        throw new Error('User not found.');
    }

    if (bill.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Unauthorized.');
    }

    const updatedBill = await Bill.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updatedBill);
});

/**
 * @desc    Delete bill
 * @route   DELETE /api/bills/:id
 * @access  Private
 */
const deleteBill = asyncHandler(async (req, res) => {
    const bill = await Bill.findById(req.params.id);

    if (!bill) {
        res.status(400);
        throw new Error('Bill not found.');
    }

    if (!req.user) {
        res.status(401);
        throw new Error('User not found.');
    }

    if (bill.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Unauthorized.');
    }

    await bill.remove();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getBills,
    setBill,
    updateBill,
    deleteBill,
};