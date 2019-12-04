const path = require('path');

module.exports = {
    mode: 'development',
    entry: './assets/js/app.js',
    output: {
        path: path.resolve(__dirname, 'application'),
        filename: 'application.js'
    }
};