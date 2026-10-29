var express = require('express');
var router = express.Router();
const { success } = require('../middlewares/apiResponse');
router.get('/', (req, res) => {
    return success(res, {
        name: 'ArtGallery API',
        version: '1.0.0',
        status: 'online'
    }, 'Bem-vindo à API do ArtGallery.');
});

module.exports = router;