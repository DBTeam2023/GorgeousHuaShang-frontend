const {defineConfig} = require('@vue/cli-service');

module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    assetsDir: 'static',
    parallel: false,
    publicPath: './',
});
module.exports.devServer =
    {
        proxy: {
            '/api': {
                target: "http://47.115.231.142:8081",
                changeOrigin: true,
            }
        }
    };

