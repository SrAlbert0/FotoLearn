const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const ruleForJs = {
    test: /\.js$/, //RegEx all files ended in .js
    loader: 'babel-loader',
    options: {
        presets:[
            ["@babel/preset-react", {
                runtime: "automatic" //to not have to manually import react
            }]
        ]//Babel configuration for React
    }
}

const rulesForCSS = {
    test: /\.css$/,
    use: ["style-loader", "css-loader"] //Importar CSS en los js
}

const rules =[ruleForJs, rulesForCSS]

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/" //default url
    },
    module:{
        rules
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "template.html",
        })
    ],
    devServer: {
        open: true, //abre el navegador al ejecutarse
        port: 8888,
        allowedHosts: "all",
        historyApiFallback: true, //usar urls en react
    }
}


