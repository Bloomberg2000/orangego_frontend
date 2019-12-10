const proxy = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        proxy('/imgs', {
            target: 'http://localhost',
            changeOrigin: true
        })
    )
}
