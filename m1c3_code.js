/** Mark Holliday
 * Module 1 Chapter 3 Code
*/

/** The absolute value of x. */
function myAbs(x) {
    return x > 0 ? x : -x ;
}
console.log(myAbs(-3));  // 3
console.log(myAbs(27));  // 27


function go(username) {
	greeting = "hello " + (username ? username : "there");
	return greeting;
}
console.log(go("Jill"));   // 'hello Jill'
console.log(go());			// 'hello there'
console.log();

// equivalent to the below if statement
function go1(username) {
    greeting = "hello ";
    if (username) {
        greeting += username;
    } else {
        greeting += "there";
    }
    console.log(greeting);
}
go1("Jill");  // 'hello Jill'
go1();        // 'hello there'
console.log();

// if the value is a string, wrap it in quotes, 
// otherwise, convert it into a string
// by using the `toString()` method of `value`.

function go2(value) {
	result = ((typeof value) === 'string') ? "'" + value + "'" : value.toString();
    return result;
}
console.log(go2("red"));   // '"red"'
console.log(go2(7));		// "7"

// equivalent using string template literals
//(typeof value === "string") ? `'${value}'` : value.toString()

console.log();

let i, j, sum = 0;
for (i = 0, j = 10; i < 10; i++, j--) {
    sum += i * j
}
console.log(sum);

function tail(o) {  // return the tail of linked list o
    for (; o.next; o = o.next)  /* empty */ ;  // traverse while o.next is truthy
    return o;
}
let last = {value: 3, next: null};
let prev1 = {value: 4, next: last};
let prev2 = {value: 5, next: prev1}
let first = prev2;
console.log(tail(first));
console.log();

let o = {w: 2, v: 3};
for (let p in o) {      // assign property names of o to variable p
    console.log(p, o[p]);   // print the name (key) and then the value of each property
}
console.log();

let a = [3, 4, 2, 9];
for (let i in a) {
    console.log(i, a[i]);
};  
console.log();

// for-of statement
// this example iterates over an array
let data = [1, 2, 3, 4, 5, 6, 7, 8, 9], sum1 = 0;
for (let element of data) {
    sum1 += element;
}
console.log(sum1);     // => 45

// this example iterates over the characters in a string
let color = "blue";
for (let letter of color) {
    console.log(letter);
}

// this example throws a TypeError since o is an object that is not iterable
let o1 = {x: 1, y: 2, z: 3};
// for (let element of o1) {
//    console.log(element);
// }

// this example illustrates how to iterate through 
// the properties of an object
// such as o that is not iterable itself
let o2 = {x: 1, y: 2, z: 3};
let keys = '';
for (let k of Object.keys(o2)) {
    keys += k
}
console.log(keys);    // => "xyz"

let sum2 = 0;
for (let v of Object.values(o2)) {
    sum2 += v;
}
console.log(sum2);     // => 6

// try-catch statement
try {
    // Block of code to try
//    nonExistantFunction();   // throws an error when not commented out
} catch (err) {
    // Go here when an error occurs
    console.error("This function does not exist");
    console.error(err);
    process.exit(1);//Exit with failure code
};

try{
    // Try this code.
} catch(error) {
    // Go here when an error occours
} finally {
    // Go here when either try or catch has finished, whether or not an 
    // exception was caught.
};

function feed(foodName, qty) {
	let output = "";
	if (foodName === "Tide Pod" || typeof foodName !== "string") {
		throw new Error("Invalid Food Error!");
    } else if (qty < 1) {
	    throw new Error("Invalid food quantity error");
    } else {
		console.log("Mmmm " + foodName);
		for (i = 0; i < qty; i++) {
			if (i == 0)
				output = "Om ";
			else
				output = "Nom ";
        }
    }
}

try {
	feed("Tide Pod", 10);
} catch(err) {
	console.error(err);
} finally {
    console.log("Always print this.");
};