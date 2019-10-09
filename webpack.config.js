const HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require('path');
module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_module/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader"
                }
            },
            {
                test:/\.(s*)css$/,
                use:['style-loader','css-loader', 'sass-loader']
            },
            { 
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 'false',
                        },
                    },
                ],
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ]
}