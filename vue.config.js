const {defineConfig} = require('@vue/cli-service');

module.exports = defineConfig({transpileDependencies: true, lintOnSave: false});
module.exports.devServer =
    {
        proxy: {
            '/api': {
                target: process.env.VITE_BASE_URL,
                changeOrigin: true,
            }
        }
    }
