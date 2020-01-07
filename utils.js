var fs = require("fs");
let join = require('path').join;

// 日期格式化
function formatNumber(n) {
	n = n.toString()
	return n[1] ? n : '0' + n
}

function dateFormat(time, format = 'Y-M-D') {
	// 'Y/M/D h:m:s w'
	if (!time) {
		return '';
	}
	var formateArr = ['Y', 'M', 'D', 'h', 'm', 's', 'w']
	var returnArr = []
	var week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
	var date = new Date(time)
	returnArr.push(date.getFullYear())
	returnArr.push(formatNumber(date.getMonth() + 1))
	returnArr.push(formatNumber(date.getDate()))
	returnArr.push(formatNumber(date.getHours()))
	returnArr.push(formatNumber(date.getMinutes()))
	returnArr.push(formatNumber(date.getSeconds()))
	returnArr.push(week[date.getDay()])
	for (var i = 0; i < returnArr.length; i++) {
		format = format.replace(formateArr[i], returnArr[i])
	}
	return format
}
// 
function findSync(path) {
	let result = [];
  let files = fs.readdirSync(path);
  files.forEach((val, index) => {
    // let fPath=join(path,val)
    // console.log(fPath)
    // console.log(val)
    result.push(val)
  });
  return result;
}
// 
function handleData (data, type) {
	let str = ''
	data.forEach((list) => {
    list.data.splice(12).slice(0,-1).forEach((item) => {
      item.forEach((value, j) => {
        if (value && j % 2 === 1) {
          var obj = {
            date: dateFormat(new Date()),
            code: value,
            num: item[j+1],
            type: type
          }
          str += JSON.stringify(obj)
        }
      })
    })
	})
	return str
}

module.exports = {
	dateFormat,
	findSync,
	handleData
}