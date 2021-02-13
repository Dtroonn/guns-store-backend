const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'papigun172@gmail.com',
        pass: 'lalka123456' 
    }
});
 