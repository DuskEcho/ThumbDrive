const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                    loader: "babel-loader"
            }
        ]
    },
    entry: "./public/js/App.jsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'public'),
    },
    target: "node",
    externals: {
        express: "require(\"express\")"
    }
};