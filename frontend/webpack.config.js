const path = require("path");
const webpack = require("webpack");

//const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = (env, argv) => {
    const virtualDir = "portal";
    const apiHost = argv.env.endpoint ? argv.env.endpoint : "" ;
    const plugins = [
        new webpack.DefinePlugin({
            VIRTUAL_DIR: JSON.stringify(virtualDir),
            HOST: JSON.stringify(apiHost),
        }),
    ];

    //console.log("Build configuration:", { virtualDir, apiFolder, apiHost }); // eslint-disable-line no-console
    const [ apiFolder, app ] = [ "src/", "./App.js" ];

    return {
        entry: "./src/index.js",
        mode: argv.mode,
        module: {
            rules: [ {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules\/(?!validate_mini))/,
                loader: "babel-loader",
                options: { presets: [ "@babel/env" ] },
            }, {
                test: /\.css$/,
                use: [ "style-loader" ],
            }, {
                test: /\.css$/,
                loader: "css-loader",
                options: { url: false },
            }, {
                test: /\.png/,
                use: [ "file-loader" ],
            } ]
        },
        resolve: {
            extensions: [ "*", ".js", ".jsx" ],
            alias: {
                "api-folder": path.resolve(apiFolder),
                "app": app,
                "src": path.resolve("src"),
            },
            fallback: {
                "buffer": require.resolve("buffer/"),
                "promise": require.resolve("promise-polyfill/"),
            },
        },
        output: {
            path: path.resolve(__dirname, "public/dist/"),
            publicPath: virtualDir ? `/${virtualDir}/dist/` : "/dist/",
            filename: "bundle.js",
        },
        /*devServer: {
            contentBase: path.join(__dirname, "public/"),
            historyApiFallback: true,
            port: 3000,
            publicPath: "http://localhost:3000/dist/",
        },*/
        plugins,
    };
};