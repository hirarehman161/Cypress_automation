/*Write a function that:

Takes two numbers as input.
Returns the sum if the first number is even.
Returns the product if the first number is odd
*/

// function add(num1,num2){
//     let sum = num1 + num2
//     let prod = num1 * num2
//     if (num1 % 2 == 0)
//         return sum
//     else 
//         return prod
    
// }

// describe ('Odd ' , ()=>{

//     expect(add(1,2)).to.equal(3)
// })

/*
Write a function that:

Takes a number as input.
Returns "Positive" if the number is greater than zero.
Returns "Negative" if it's less than zero.
Returns "Zero" if it's exactly zero.
// 💡 Use a ternary operator! Try it out and let me know your answer! 🚀
//  */ 
// let num = Number(prompt ("Enter Number"));
// if (num > 0)
//     console.log('Positive') 
// else if (num === 0)
//     console.log( 'zero')
// else 
// console.log( 'Negative')


//let result = num>0 ? 'Positive' : num === 0 ? 'Zero' : 'Negative'

/*
Write a function that:

Takes two numbers as input.
Returns:
"Greater" if the first number is greater.
"Smaller" if the second number is greater.
"Equal" if both are the same.
Use a ternary operator! 🚀
Try it out and let me know your answer! 🎯
*/

// let n1 = Number(prompt('Enter first Number'))
// let n2 = Number(prompt('Enter second Number'))

//let result = n1>n2 ? 'Greater' : n1 ===n2? 'Equal': 'Smaller';

/*
Write a function that:

Takes a number as input.
Returns "Even" if the number is even.
Returns "Odd" if the number is odd.
Use a ternary operator!
Try it out and let me know your answer! 🎯
*/

// let n1 = Number(prompt('Enter first Number'))
// let result = n1 %2 == 0 ? 'Even' : 'ODD'

/*
 Write a function that:

Takes a year as input.
Returns "Leap Year" if it is a leap year.
Returns "Not a Leap Year" otherwise.
Use a ternary operator!
💡 Hint: A year is a leap year if:

It is divisible by 4 AND (not divisible by 100 OR divisible by 400).
// Try it out and let me know your answer! 🎯🚀
//  */
// let year =Number(prompt('Enter leap year'))
// let result = (year%4==0) && (!(year %100 !==0) || !(year%400 ==0) ) ? 'Leap Year' : 'Not Leap Year'

/*
🚀 Next Challenge:
Write a function that:

Takes a number as input.
Returns "Prime" if the number is prime.
Returns "Not Prime" if it is not a prime number.
Use a loop (for or while) to check divisibility!
Try it out and let me know your answer! 🚀
*/


// function isPrime(n){
//     if (n < 2){
//         return 'Not Prime'
//     }
//     for (let i = 2 ; i < n ; i++){
//         if( n % i == 0)
//             return 'Not Prime'
//     }
//     return 'Prime'

// }
// console.log(isPrime(2))

//==== Reverse String

// Way 1
// const str = 'Hello'
// let ReverseStr = ''

// for (let i = str.length -1 ; i >=0 ; i --)
// {
//     ReverseStr += str[i]
// }
// console.log(ReverseStr)
//way 2
// const str = 'Hello'
// let ReverseStr = ''

// for (let i = str.length -1 ; i >=0 ; i --)
// {
//     ReverseStr += str.charAt(i)
// }
// console.log(ReverseStr)
//way 3

// const str = 'Hello'
// let mystr = str.split('').reverse().join('')
// console.log(mystr)

// function reverseString (str) {
//     return str.split('').reverse().join('')
// }
// console.log(reverseString('hello'))

// const reverseFunction = str => str.split('').reverse().join('')
// console.log(reverseFunction('hello'))


const ReverseFunctionArrow = (str) => {
      mystr = str.split('').reverse().join('')
      return mystr
}

let mystr = (ReverseFunctionArrow('Madam'))

let str = 'Madam'

if (str === mystr){
      return true
}




