const router = require('express').Router();
const { DisplayRoot, DisplayReset } = require('../controllers/Other.controller')

/**
 * @summary Routing
 * Base: http://localhost:3000/
 * Test Reset Form: http://localhost:3000/reset
 */
router.get('/', DisplayRoot);
router.get('/reset', DisplayReset);

module.exports = router;