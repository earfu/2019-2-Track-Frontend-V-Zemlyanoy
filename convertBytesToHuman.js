/*
 * В этом задании надо разработать функцию
 * `convertBytesToHuman`. Эта функция  должна принимать
 * аргумент `bytes` только числового типа.
 * На выходе функция должна отдать
 * человекопонятную строку, которая будет
 * отражать размер файла. Примеры использования:
 * `convertBytesToHuman(1024) === '1 KB';`
 * `convertBytesToHuman(123123123) === '117.42 MB';`
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

export default function convertBytesToHuman(bytes) {
  // your solution goes here
  var t = ((typeof(bytes) == 'number') && (Number.isInteger(bytes)) && (bytes >= 0))
  //technically, does allow, e.g., 2.0 as integer
  //allows 0 too
  //also technically, the first check is probably obsoleted by the second

  var pref = ['', 'K', 'M', 'G', 'T'] //various prefixes for unit
  //yes, it could be beyond a TB; that will get a result of "4096 TB"
  //so what, that's still correct
  var pcount = 0 //the prefix to use, in terms of the array position
  
  if (t) {
    while ((bytes >= 1024) && (pcount < 4)) {
      bytes = bytes/1024
      pcount += 1
    }
  }
  bytes = Math.round( (bytes + Number.EPSILON)*100 )/100
  //black magic just to round a number, just great
  
  return (t && (bytes + ' ' + pref[pcount] + 'B')) //logical AND behavior FTW

}
