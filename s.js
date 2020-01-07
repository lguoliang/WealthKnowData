'use strict';
var utils = require('./utils');
var fs = require("fs");
var xlsxrd = require('node-xlsx')

let str = ''
let date = utils.dateFormat(new Date())
let route = `./xls/${date}`
let fileNames = utils.findSync(route);
fileNames.forEach((file, i) => {
  console.log(file)
  let arr = file.split('.')
  if (arr[1] === 'xls') {
    let xlsData = xlsxrd.parse(`${route}/${file}`)
    str += utils.handleData(xlsData, arr[0])
  }
})
// console.log(str)
fs.writeFile(`./json/${date}.json`, str, 'utf8', (err) => {
  if (err) throw err;
  console.log('The file has been saved!')
});
