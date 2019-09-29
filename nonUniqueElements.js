/*
You are given a non-empty list of integers (X).

For this task, you should return a list consisting of
only the non-unique elements in this list.

To do so you will need to remove all unique elements
(elements which are contained in a given list only once).

When solving this task, do not change the order of the list.

Example:

input (array of integers): [1, 2, 3, 1, 3]
output (iterable of integers): [1, 3, 1, 3]

1 and 3 are non-unique elements.

More examples:

nonUniqueElements([1, 2, 3, 1, 3]) == [1, 3, 1, 3]
nonUniqueElements([1, 2, 3, 4, 5]) == []
nonUniqueElements([5, 5, 5, 5, 5]) == [5, 5, 5, 5, 5]
nonUniqueElements([10, 9, 10, 10, 9, 8]) == [10, 9, 10, 10, 9]
 */

export default function nonUniqueElements(data) {
  // your solution goes here
  var n = data.length
  
  var delc = 0 //count for deleted elements
  for (var i = 0; i < n; i++) { //one-by-one check
    var count = 0 //number of matches
    var m = data[i - delc]
    for (var j = 0; j < (n - delc); j++) {
      if (m == data[j]) {
        count++
      }
    }
    if (count == 1) { //if no other matches
      data.splice(i - delc,1) //delete right from there
      delc++ //no copy arrays needed, really
    }
  }

  return data
}
//console.log(nonUniqueElements([5,5,1,21,1]))
