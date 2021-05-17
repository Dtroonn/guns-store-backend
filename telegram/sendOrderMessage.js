const axios = require('axios');

const botToken = '1794183102:AAGFW79y_wfO2QtRecNvK9GexXcimAdjY54';
const chatId = '-512078336';
const message = 'Привет лалка азазаза магазин';

module.exports = async function (order) {
    try {
        const encodeMessage = encodeURI(createMessage(order));
        const response = await axios.post(
            `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&parse_mode=html&text=${encodeMessage}`,
        );
    } catch (e) {
        throw e;
    }
};

const createMessage = (order) => {
    const messageFields = [
        `<b>Имя:</b> ${order.contactDetails.name}`,
        `<b>Телефон:</b> ${order.contactDetails.tel}`,
        `<b>Почта:</b> ${order.contactDetails.email}`,
        `<b>Город:</b> ${order.delivery.adress.city}`,
        `<b>Улица, дом:</b> ${
            order.delivery.adress.street ? order.delivery.adress.street : 'Не указано'
        }`,
        `<b>Подъезд:</b> ${
            order.delivery.adress.entrance ? order.delivery.adress.entrance : 'Не указано'
        }`,
        `<b>Квартира:</b> ${
            order.delivery.adress.apartment ? order.delivery.adress.apartment : 'Не указано'
        }`,
        `<b>Способ доставки:</b> ${order.receiOption.title}`,
        `<b>Стоимость доставки:</b> ${order.receiOption.price} руб`,
        `<b>Способ оплаты:</b> ${order.payOption.title}`,
        `<b>Заказ</b>: {\n${order.items
            .map(
                (item) =>
                    `<i>Название:</i> ${item.product.name}, <i>Категория:</i> ${item.product.category.name}, <i>Кол-во:</i> ${item.count},`,
            )
            .join('\n')}\n}`,
        `<b>Общая цена:</b> ${order.totalPrice} руб`,
        `<b>Комментарий к заказу:</b> ${
            order.delivery.comment ? order.delivery.comment : 'Не указано'
        }`,
    ];

    return messageFields.join('\n');
};
