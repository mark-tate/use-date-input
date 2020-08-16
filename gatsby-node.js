// gatsby-node.js
const path = require('path')
exports.onCreateWebpackConfig = args => {
    args.actions.setWebpackConfig({
        resolve: {
            // ⚠ Note the '..' in the path because the docz gatsby project lives in the `docs-src` directory
            modules: [path.resolve(__dirname, '../src'), 'node_modules'],
            alias: {
                '@': path.resolve(__dirname, '../packages/'),
            },
        },
    })
}
