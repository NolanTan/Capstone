/** Mark Holliday
 * Module 1 Chapter 2 Code
 */
console.log("");   // the empty string
console.log('testing');
console.log("3.14");
// console.log('hello");     // ERROR since both quotes need to 
					// be of the same kind
console.log('name = "myform"');
console.log("Wouldn't you prefer O'Reilly's book>");
console.log(`"She said 'hi'", he said.`);


// a string representing 2 lines written on one line
console.log('two\nlines');

// a one-line string written on three lines
console.log("one\
long\
line");

// a two-line string written on two lines
console.log(`the newline character at the end of this line
is included literally in this string`);
console.log();

console.log(0 == "");     // => true
console.log("0" == 0);    // => true
console.log("5" - 1);     // => 4 since "5" is converted to 5
console.log("5" + 1);     // => "51" since the + is viewed as 
		// concatenation and the 1 is changed to "1"
console.log("five" * 2);  // => NaN
console.log("red" != true);  // => true even though "red" 
					// is truthy
console.log("red" !== 1);     // => true since strict 							// inequality check
console.log();
console.log("all" < "azz");   // => true
console.log(String(5 + 2));    // str == "7"
console.log();

let s = "Hello world";
console.log(s.substring(1, 4));    // => "ell"
console.log(s.slice(1, 4));        // => "ell"
console.log(s.slice(-3));       // "rld": the last 3 characters

console.log(s.indexOf("l")); // => 2: position of first letter l

console.log(s.toUpperCase());     // => "HELLO, WORLD"
console.log(s.toLowerCase());    // => "hello, world"
console.log(s.startsWith("Hell"));  // => true: the strings with 
				// this substring
console.log(s.replace("llo", "ya"));  // => "Heya, world"

let s1 = "green";
console.log(s1[0]);    // => "g"
console.log(s1[s1.length - 1]);   // => "n"
console.log();

let day1 = {
    squirrel: false,
    events: ["work", "touched tree", "pizza", "running"]
};
console.log(day1);

let strname = "string name"; // a string to use as a 
					// property name
let symname = Symbol("propname");   // a Symbol to use 
					// as a property name
console.log(typeof strname);      // => "string"
console.log(typeof symname);      // => "symbol"
let o = {};     // create a new object
o[strname] = 1;  // define a property with a string name
o[symname] = 2;   // define a property with a Symbol name
console.log(o[strname]);         // => 1
console.log(o[symname]);      // => 2
console.log(o);	// { 'string name': 1, [Symbol(propname)]: 2 }
console.log();


let s2 = "hello";
console.log(s2.toUpperCase());  // returns "HELLO", but does 
					// not alter s
console.log(s2); // => "hello": the original string is  
			// not changed
console.log();

let o1 = {x: 1};   // create an object and assign it the name o
o1.x = 2;    // mutate it by changing the value of a property
o1.y = 3;    // mutate it by adding a new property
console.log(o1);   // {x: 2, y: 3}

let a = [1, 2, 3];  // create an array and assign in the name a
a[0] = 0;           // change the value of an array element
a[3] = 4;           // add a new array element
console.log(a);	// [0, 2, 3, 4]

let o2 = {x: 1}, p = {x: 1};   // create two objects with 
					// the same properties
console.log(o2 === p);     // => false: distinct objects 
					// are never equal

let a1 = [], b = [];     // create two distinct, empty arrays
console.log(a1 === b);     // => false: distinct arrays 
					// are never equal
console.log();

let a2 = [];
let b1 = a2;   // now b refers to the same array that 
			// a refers to
b1[0] = 1;   // mutate the array referred to by variable b
console.log(a2[0]);  // => 1: the change is also visible 
			// using variable a2
console.log(a2 === b1); // => true: a and b refer to the 
			// same object, so they are equal
console.log();

let o3 = {x: 1};
let p1 = o3;
console.log(o3 === p1);
		// => true since both variables reference 
		// (point to) the same object
p1.y = 3;	// add a property with name y and value 3 to 
		// the object referenced by p
console.log(o3.y);	// => 3 since the variable o references
			// the same object that p references
console.log(o3);  // {x: 1, y: 3}
console.log();

/**
* Mark Holliday
* 25 August 2023
* Module 1 Example of Scope
*/
let val1 = 25; // global scope
const VAL2 = 30;        // global scope
var val3 = 35;  // global scope
val4 = 40;      // global scope

console.log(val1);  // 25
console.log(VAL2);  // 30
console.log(val3);  // 35
console.log(val4);  // 40

var go = function() {
    if (val1 === 25) {
        let val5 = 40;  // block scope so just visible in 
					// this if statement
        const VAL6 = 45;  // block scope also
        var val7 = 50;  // function scope so visible 
				// throughout this function
        val8 = 55;      // global scope
    }
    // console.log(val5);    // ERROR not visible; not in block
    // console.log(VAL6);    // ERROR not visible; not in block
    console.log(val7);  // 50
    console.log(val8);  // 55
};

go();

// console.log(val5);  // ERROR not visible; not in block
// console.log(val6);  // ERROR not visible; not in block
// console.log(val7);  // ERROR not visible; not in function
console.log(val8);  // 55

// appendix
let [x, y] = [1, 2];      // same as let x = 1, y = 2
[x, y] = [x + 1,y + 1];      // same as x = x + 1, y = y + 1
console.log([x, y]);      // [2, 3]
[x, y] = [y, x];        // swap the values of the two variables
console.log([x, y]);                  // => [3, 2]

let [x1, ...y1] = [1, 2, 3, 4];       // y1 == [2, 3, 4]
console.log(x1, y1);		// 1 [2, 3, 4]
console.log([x1, ...y1]);

