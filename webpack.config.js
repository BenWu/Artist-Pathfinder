const rootPath = './src';

module.exports = {
    entry: {
        app_js: [
            rootPath + '/js/app.js'
        ],
        main_css: [
            rootPath + '/styles/main.scss'
        ]
    },
    output: {
        filename: './pathfinder/static/js/[name].js'
    },
    resolve: {
        extensions: ['.js', '.scss']
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.scss$/i, loaders: [
                require.resolve('style-loader'),
                require.resolve('css-loader'),
                require.resolve('sass-loader')
            ] }
        ]
    },
    plugins: [],
};