/*
 * 构建任务
 *
*/
const path = require('path');
var _path =  path.join(__dirname,'src');
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
    			include: _path,
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