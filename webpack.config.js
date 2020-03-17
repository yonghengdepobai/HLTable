const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// extract-loader
let pathsToClean = ['dist'];
let cleanOptions = {
    root: path.resolve(__dirname),
    verbose: true,
    dry: false,
};

module.exports = {
    entry: './index.ts',
    output: {
        filename: 'build.js', // 生成的filename需要与package.json中的main一致
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'var',
        // "var" | "assign" | "this" | "window" | "self" | "global" | "commonjs" | "commonjs2" |
        //  "commonjs-module" | "amd" | "amd-require" | "umd" | "umd2" | "jsonp" | "system"
        library: 'HLTable',
    },
    mode: 'production',
    devtool: 'source-map',
    resolve: { // Resolve 配置 Webpack 如何寻找模块所对应的文件
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        // loaders: [
        //     {test: /\.tsx?$/, loader: 'awesome-typescript-loader'}
        // ],
        // preLoaders: [ // preLoaders
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, './tsconfig.json'),
                        }
                    }
                ],
                exclude: '/node_modules/'
                //  loader: 'awesome-typescript-loader'
            },
            {test: /\.js$/, loader: 'source-map-loader'},
            { test: /\.css$/,
                use: ExtractTextPlugin.extract({
　　　　　　　　　　　　　　fallback: 'style-loader',
　　　　　　　　　　　　　　use: 'css-loader'
　　　　　　　　　　　　 })
            },
        ]
            
        // ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ExtractTextPlugin('./css/index.css')
    ],

    devServer: {
        contentBase: "./example",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
      },
}