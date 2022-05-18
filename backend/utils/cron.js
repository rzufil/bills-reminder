const cron = require('node-cron');
const sgMail = require('@sendgrid/mail');
const billModel = require('../models/billModel');
const userModel = require('../models/userModel');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const scheduleCron = () => {
    cron.schedule('0 0 * * *', async () => {
        console.log('Running cron.');
        const date = new Date();
        const dueBills = await billModel.aggregate()
            .match({
                dueDate: date.getDate()
            })
            .group({
                _id: '$user',
                reminders: {
                    $push: {
                        name: '$name',
                        repeat: '$repeat',
                        dueDate: '$dueDate',
                        dueMonth: '$dueMonth',
                        category: '$category',
                        notes: '$notes'
                    }
                }
            });
        dueBills.map(async (_user) => {
            const userId = _user._id.toString();
            const user = await userModel.find({ _id: userId });
            const userName = user[0].name;
            const userEmail = user[0].email;
            const reminders = _user.reminders;
            let remindersText = '';
            reminders.forEach((reminder) => {
                if (reminder.dueMonth !== null && reminder.dueMonth !== date.getMonth() + 1) {
                    return;
                }
                remindersText += reminder.notes.length
                    ? ` - ${reminder.name} (${reminder.notes})\n`
                    : ` - ${reminder.name}\n`;
            });
            const emailText = `Hello ${userName},\nThe following bills should be paid today:\n${remindersText}`;
            const msg = {
                to: userEmail,
                from: process.env.SENDGRID_SENDER_EMAIL,
                subject: 'Bills due today!',
                text: emailText,
            }
            sgMail.send(msg);
        });
    }, {
        timezone: 'UTC'
    });
};

module.exports = { scheduleCron };