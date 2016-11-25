/*
 * 构建任务
 *
*/
module.exports = {
    entry: './src/js/index.js',
    output:{
        filename:'UIP.js',
        path:__dirname + '/build/'
    },
    module:{
    	loaders:[
    		{
    			test: /\.js/,
    			loader: "babel",
    			include: __dirname + '/src',
                query: {
                  presets: ['es2015']
                }
    		},
            {
                test: /\.less/,
                loader: "style-loader!css-loader!less-loader"
            }
    	]
    },
    resolve:{
    	extensions:["",'.js']
    }
};