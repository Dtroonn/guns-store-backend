const { EMAIL_FROM, BASE_URL } = require('../keys');

module.exports = function(email, name, token) {
    return {
        from: EMAIL_FROM,
        to: email,
        subject: 'Восстановление пароля',
        html: `
        <h2>
            Здравствуйте, ${name}! Для восстановления пароля перейдите по ссылке, которая находится ниже:
        </h2>
        <br/>
        <div>
            <a href="${BASE_URL}/api/auth/resetPassword/${token}">
                "${BASE_URL}/api/auth/resetPassword/${token}"
            </a>
        </div>
        <br/>
        <div>С уважением, магазин <a href="${BASE_URL}/guns">Papigun</a></div>
        `
    }
}