const path = require('path');
const htmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = {
    mode: 'production',
    entry: './src/app.tsx',
    output: {
        path: path.resolve( __dirname, 'build' ),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader"
                },
            },
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    devtool: 'inline-source-map',
    plugins: [
        new htmlWebpackPlugin({
            title: 'Checkers',
            template: 'assets/index.tpl.html'
        })
    ]
};