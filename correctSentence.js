/*
For the input of your function, you will be given one sentence.
You have to return a corrected version,
that starts with a capital letter and ends with a period (dot).

Example:

input (string): "hey, friend"
output (string): "Hey, friend."

Updated first 'h' to 'H', added '.'.

More examples:

correctSentence("greetings, friends") == "Greetings, friends."
correctSentence("Greetings, friends") == "Greetings, friends."
correctSentence("Greetings, friends.") == "Greetings, friends."
 */

export default function correctSentence(text) {
  // your solution goes here
  var output = '';
  if (text.length != 0) {
    //first symbol
    output += text[0].toUpperCase();
  }

  if (text.length > 1) {
    //strings are immutable, so add char by char
    for (var i = 1; i < text.length; i++) {
      //and yes, memory usage
      output += text[i]; //should be using a buffer instead
    }
  }

  if (output[output.length - 1] != '.') {
    //last symbol check/add
    output += '.';
  }
  text = output; //so, why is output set to be the same variable?..

  return text;
}
