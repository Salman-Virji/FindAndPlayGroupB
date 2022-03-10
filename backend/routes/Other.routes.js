const router = require('express').Router();

/**
 * Routing: http://localhost:3000/
 */
router.get('/', (req, res) => {
    res.render('root');
});

module.exports = router;