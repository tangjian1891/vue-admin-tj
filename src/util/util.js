/**
 * //将base64转换为blob
 * @param {*} dataurl base64字符串
 * return blob
 */
let dataURLtoBlob = function (dataurl) {
  var arr = dataurl.split(',')
  var mime = arr[0].match(/:(.*?);/)[1]
  var bstr = atob(arr[1])
  var n = bstr.length
  var u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

/**
 * blob对象转file对象
 * @param {*} theBlob  blob对象
 * @param {*} fileName  文件的名称
 * return file
 */
var blobToFile = function (theBlob, fileName) {
  theBlob.lastModifiedDate = new Date()
  theBlob.name = fileName
  return theBlob
}

export { dataURLtoBlob, blobToFile }
