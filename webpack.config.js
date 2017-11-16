var path = require('path'),
    webpack = require('webpack'),
    Dotenv = require('dotenv-webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin');
const config = {
    entry: {
        app: './src/main'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'app.bundle.js'
    },
    resolve: {
        extensions: ['.js', '.ts', '.css', '.scss', '.html']
    },
    module: {
        rules: [{
                test: /\.ts$/,
                use: ['awesome-typescript-loader', 'angular2-template-loader', '@angularclass/hmr-loader', 'angular2-router-loader'],
                exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
            },
            {
                test: /\.scss$/,
                exclude: [/node_modules/],
                use: [
                    'raw-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            // Or array of paths
                            resources: [
                                './src/assets/sharedStyles/_variables.scss',
                                './src/assets/sharedStyles/_mixins.scss'
                            ]
                        },
                    }
                ]
            },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.html$/, loader: 'raw-loader' },
            { test: /\.(eot|ttf|wav|mp3|pdf|woff2|woff|png|svg|gif)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
        ]
    },
    // plugins
    plugins: [
        new Dotenv({
            path: './.env', // Path to .env file (this is the default) 
        }),
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            __dirname // location of your src
        ),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunksSortMode: 'dependency'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new CopyWebpackPlugin([{
            from: './src/assets',
            to: './assets',
            copyUnmodified: true,
            force: true
        }])
    ],
    devServer: {
        contentBase: path.join(__dirname, "src/"),
        compress: true,
        port: process.env.WEBPACK_DEV_SERVER_PORT,
        historyApiFallback: true,
        inline: true,
    }

};
module.exports = config;