const { EMAIL_FROM, BASE_URL } = require('../keys');

module.exports = function(email, name) {
    return {
        from: EMAIL_FROM,
        to: email,
        subject: 'Пароль успешно изменен',
        html: `
        <h2>
            Здравствуйте, ${name}! Ваш пароль успешно изменен.
        </h2>
        <br/>
        <div>С уважением, магазин <a href="${BASE_URL}/guns">Papigun</a></div>
        `
    }
}