module.exports = {
    lintOnSave: false,
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/': {
                target: 'https://news-at.zhihu.com/api/4',
                changeOrigin: true
            }
        }
    }
}