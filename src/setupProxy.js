const proxy = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        proxy('/imgs', {
                target: 'http://localhost',
                changeOrigin: true
            }
        )
    );
    app.use(
        proxy('/api', {
                target: 'http://localhost:8080',
                changeOrigin: true
            }
        )
    );
}
