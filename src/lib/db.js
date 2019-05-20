const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const config = require('config')
const logger = require("./logger")

const connectString = `mongodb://${config.get('db.connect')}:${config.get('db.port')}/${config.get('db.database')}`
mongoose.Promise = require('bluebird')
mongoose.connect(connectString, {useNewUrlParser: true})

mongoose.connection.on('connected', function () {
  logger.debug('Mongoose connection open to ' + connectString)
})  
mongoose.connection.on('error',function (err) {    
  logger.fatal('Mongoose connection error: ' + err);  
})  
mongoose.connection.on('disconnected', function () {    
  logger.debug('Mongoose connection disconnected');  
})

/**
 * 已递归的形式，读取models文件夹下的js模型文件，并require
 * @param  {[type]} modelPath [description]
 * @return {[type]}           [description]
 */
var walk = function(modelPath) {
  fs
    .readdirSync(modelPath)
    .forEach(function(file) {
      var filePath = path.join(modelPath, '/' + file)
      var stat = fs.statSync(filePath)

      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(filePath)
        }
      }
      else if (stat.isDirectory()) {
        walk(filePath)
      }
    })
}
walk(path.join(__dirname, '/../models'))

module.exports = mongoose
