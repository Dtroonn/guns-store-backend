const {EMAIL_FROM, BASE_URL} = require('../keys');

module.exports = function(email, token) {
    return {
        from: EMAIL_FROM,
        to: email,
        subject: 'Подтверждение адреса электронной почты',
        html: `
            <h2>Для подтверждения адреса электронной почты перейдите по ссылке, которая находится ниже:</h2>
            <br/>
            <p><a href="${BASE_URL}/api/auth/emailConfirmation/${token}">
                "${BASE_URL}/api/auth/emailConfirmation/${token}"
            </a></p>
            <br/>
            <div>Если вы не регистрировались на данном сайте, то просто проигнорируйте сообщение</div>
        `
    }
}