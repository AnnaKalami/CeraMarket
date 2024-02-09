const router = require('express').Router();

const apiItemsRouter = require('./api/api.items.routes')

router.use('/api/items', apiItemsRouter);

module.exports = router;