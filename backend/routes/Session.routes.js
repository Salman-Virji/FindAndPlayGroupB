const router = require('express').Router();

const DisplaySession = async (request, response) => {
    request.session.user = "654321"
    response.send(request.session.user)
}

/**
 * @summary Routing
 * Base: http://localhost:3000/session
 */
router.get('/', DisplaySession);

module.exports = router;