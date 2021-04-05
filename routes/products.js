const { Router } = require('express');

const { ProductCntrl } = require('../controllers');
const { createProductValidator, getProductsValidator } = require('../utils/validators/product');
const { parallelValidate } = require('../middleware');
const upload = require('../utils/multer');

const router = Router();

router.get(
    '/',
    parallelValidate(getProductsValidator, 400),
    require('../middleware/favorites'),
    ProductCntrl.get,
);

router.post(
    '/',
    upload.single('image'),
    parallelValidate(createProductValidator),
    ProductCntrl.create,
);

module.exports = router;
