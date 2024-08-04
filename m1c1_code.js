/** Mark Holliday
 * Module 1 Chapter 1 code mh
 */
// typeof operator
function doit(param1) {
    if (typeof param1 === 'function') {
        param1();   // becomes a call to go()
    }
}

let go = function() {
    console.log("Hi");
};

doit(go);   // displays 'Hi"
doit(7);    // the if statement in doit() does not try to call 7 as a function
console.log();

// meaning of null and undefined
let test1;    // the value of this variable test1 is of data type undefined
console.log(typeof test1);   // undefined
let test2 = null;   // the value of this variable test2 is the 
                    // value null of data type null
console.log(typeof test2);   // object, but null is really the type of null
let test3 = undefined;  
console.log(typeof test3);  // undefined

// comparison of null and undefined
console.log(undefined == null);   // => true
console.log(undefined === null);  // => false
console.log(null == null);        // => true
console.log(undefined == undefined);  // => true
console.log();

// implicit coercion with null and undefined
console.log(8 * null); // => 0  since null is converted to 0
console.log(8 / null);    // => Infinity since null is converted to 0
console.log(8 / undefined);   // => NaN
console.log(undefined / 8 );  // NaN
console.log(null / 8);        // => 0 since null is converted to 0
console.log(null + 2);    // => 2 since null becomes 0
console.log(undefined + 2);   // NaN
console.log();

// restricted implicit coercions of falsy values with the == operator
console.log(0 == false);    // true
console.log("" == 0);       // true
console.log("" == false);   // true

console.log(null == 0);     // false
console.log(null == false); // false
console.log(null == "");    // false

console.log(undefined == 0); // false
console.log(undefined == false);    // false
console.log(undefined == "");   // false

console.log(NaN == 0);      // false
console.log(NaN == false);  // false
console.log(NaN == "");     // false

// The equality checks with truthy values only sometimes makes sense
console.log(7 == true);   // => false since 7 converts to true
console.log("7" == true);  // => false even though "7" is 
			// a truthy value and "7" also converts to 7
console.log();

// implicit coercions
console.log(5 == "5");            // -> true since "5" is converted to 5 
console.log(10 > 5 || 5 == "5");  // => true since becomes 10 > 5 is truthy value so short-circuit
console.log("James" || 10 > 5);   // => "James" since "James" is truthy so short-circuit
console.log(10 > 5 || "James");   // => true since 10 > 5 is a truthy value and so short-circuit
console.log("James" && 10 > 5);   // => true since evaluates both operands and last one is true
console.log(10 > 5 && "James");   // => "James" evaluates both operands and last one is "James"
console.log("James" && 5 > 10);   // => false since evaluate both operands and last one is true
console.log(5 > 10 && "James");   // => false since 5 > 10 is false so short-circuit and 5 > 10
console.log("" && 5 > 10);        // => '' since false due to the "" and so short-circuit
console.log(5 > 10 && "");        // => false since 5 > 10 is false and so short-circuit
console.log("James" && null);     // => null since evaluates both operands and last one is falsy
console.log("James" && undefined);    // => undefined since evaluates both operands and 
                                    // last one is falsy
console.log("James" && "");       // => '' since evaluates both operands and last one is falsy
console.log("James" && 0);        // => 0 since evaluates both operands and last one is falsy
console.log("James" && 7);        // => 7 since evaluates both operands and last one is truthy
console.log();

// the Boolean() function
console.log(Boolean(""));  // => false
console.log(Boolean(0));       // => false
console.log(Boolean("red"));   // => true
console.log(Boolean(27));      // => true
console.log(Boolean(null));    // => false
console.log(Boolean(undefined));   // => false
console.log();

// special number values
console.log(5 / 0);   // => Infinity
console.log(-5 / 0);  // => -Infinity

console.log(0 / 0);   // => NaN
console.log(Math.sqrt(-4));   // => NaN
console.log("five" * 2);  // => NaN
console.log();

console.log(NaN == NaN); // => false
console.log(NaN != NaN);  // => true
let val = 0 / 0;
console.log(val != val);  // => true since the value of val is NaN
console.log(Number.isNaN(NaN));  // => true
console.log(Number.isNaN(0 / 0)); // => true since 0 / 0 evaluates to NaN
console.log();

// Implicit Type Coercion with numbers
console.log(8 / null);    // => Infinity
console.log(8 / undefined);   // NaN
console.log(undefined / 8);  // NaN
console.log(undefined + 2);   // NaN
console.log(true * 2);    // => 2 since true is converted to 1
console.log(NaN == NaN);  // => false
console.log();

/* appendix */
console.log("caf\u00e9");  // display the letters "caf" 
		// followed by the letter 
          // "e" with an acute accent over it
console.log("caf\u{E9} ");  // same output with a different 
		// form of the escape sequence
