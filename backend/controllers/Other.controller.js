const DisplayRoot = async (request, response) => response.render('root');
const DisplayReset = async (request, response) => response.render('reset');

module.exports = { DisplayRoot, DisplayReset };
