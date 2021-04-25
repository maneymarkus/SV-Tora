const path = require("path");

module.exports = {
    mode: "production",
    entry: {
        app: path.resolve(__dirname, "./resources/js/app.js"),
    },
    output: {
        path: path.resolve(__dirname, "./public/js"),
        filename: "[name].js",
        library: {
            name: "App",
            type: "umd",
        },
    },
    module: {
        rules: [
            {
                test: require.resolve("jquery"),
                loader: "expose-loader",
                options: {
                    exposes: ["$", "jQuery"],
                },
            },
            {
                test: require.resolve("tippy.js"),
                loader: "expose-loader",
                options: {
                    exposes: ["tippy"],
                }
            },
            {
                test: require.resolve("theaterjs"),
                loader: "expose-loader",
                options: {
                    exposes: ["theaterJS"],
                }
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "initial"
                },
            },
        },
    },
}
