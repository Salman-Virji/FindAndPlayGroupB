const router = require('express').Router();
const GenrateToken = require('../generateToken')

const DisplaySession = async (request, response) => {
    request.session.user = { userID: GenrateToken() };
    response.send(request.session.user);
};

/**
 * @summary Routing
 * Base: http://localhost:3000/session
 */
router.get('/', DisplaySession);

module.exports = router;
