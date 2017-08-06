//Issues: Decimal button is buggy
//Improve: add a negative sign, implement bedmas
//Improve: make screen numbers align right
//Buggs: 2-.1

var arrayA = []
var arrayB = []
var operation = ''
var oper_clicked = false
var decimal_entered = false
var result = 0 //For complicated expressions eg. 2+2*3

var screen = document.querySelector('.screen')
screen.textContent = 'RAH'

//ugly code
var elem = document.getElementsByClassName('num')
elem[0].addEventListener('click', function() {enterNumber(7)})
elem[1].addEventListener('click', function() {enterNumber(8)})
elem[2].addEventListener('click', function() {enterNumber(9)})
elem[3].addEventListener('click', function() {enterNumber(4)})
elem[4].addEventListener('click', function() {enterNumber(5)})
elem[5].addEventListener('click', function() {enterNumber(6)})
elem[6].addEventListener('click', function() {enterNumber(1)})
elem[7].addEventListener('click', function() {enterNumber(2)})
elem[8].addEventListener('click', function() {enterNumber(3)})
elem[9].addEventListener('click', function() {enterNumber(0)})



//more ugly code
//change to: var oper = document.querySelectorAll('oper')
var oper = document.getElementsByClassName('oper')
oper[0].addEventListener('click', function() {enterOperation('\/')})
oper[1].addEventListener('click', function() {enterOperation('*')})
oper[2].addEventListener('click', function() {enterOperation('-')})
oper[3].addEventListener('click', function() {enterOperation('+')})



//Handle clicking the dot button
var dot = document.getElementsByClassName('dot')
dot[0].addEventListener('click', function() {
  if (!decimal_entered) {
    decimal_entered = true
    console.log('.')
    screen.textContent += '.'
    if (!oper_clicked) {
      arrayA.push('.')
    } else {
      arrayB.push('.')
    }
  }
})



//Handle clicking the equals button
document.getElementsByClassName('ans')[0].addEventListener('click', function() {
  console.log('=')
  compute()
  screen.textContent = result.toString()
  operation = ''
})



//Handle clicking the C button
document.getElementsByClassName('reset')[0].addEventListener('click', function() {
  console.log('Clear')
  reset()
})




//FUNCTIONS USED
//----------------------
function add(a, b) {
  return (+a + +b)
}

function subtract(a, b) {
  return (+a - +b)
}

function multiply(a, b) {
  return (+a * +b)
}

function divide(a, b) {
  return (+a / +b)
}

function arrayToNum(arr) {
  //eg. [1,2,4,'.',2,0] becomes 124.20
  var ret = 0
  //handle decimals in the array
  var decimal = false
  var decimal_pos = arr.length
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === '.') {
      decimal = true
      decimal_pos = i
    }
  }
  var whole = arr.slice(0,decimal_pos)
  var dec = arr.slice(decimal_pos+1,arr.length+1)
  
  for (var i = 0; i < whole.length; i++) {
    ret += Math.pow(10,i)*whole[whole.length-i-1]
  }
  for (var i = 0; i < dec.length; i++) {
    ret += Math.pow(10,i-dec.length)*dec[dec.length-i-1]
  }
  
  return Math.round(ret*Math.pow(10,10))/Math.pow(10,10)
}

function numToArray(num) {
  return (Math.round(num*Math.pow(10,10))/Math.pow(10,10)).toString()  
}

function enterNumber(num) {
  if (operation === '' && arrayB.length !== 0) {
    reset()
  }
  
  if (!oper_clicked) {
    if (arrayA[0] === 0 && !decimal_entered) {arrayA.pop()}
    arrayA.push(num)
    console.log(num)
    screen.textContent += num.toString()
  }
  else if (oper_clicked){
    if (arrayB.length === 0) {screen.textContent = ''}
    if (arrayB[0] === 0 && !decimal_entered) {arrayB.pop();}
    arrayB.push(num)
    console.log(num)
    screen.textContent += num.toString()
  }
}

function enterOperation(str) {
  if (arrayA.length !== 0 && arrayB.length === 0) {
    operation = str
    oper_clicked = true
    decimal_entered = false
    console.log(str)
  }
  //For the case where we do eg. 2+2<enter>*7 or 2+2*7
  else if (arrayA.length !== 0 && arrayB.length !== 0) {
    if (operation !== '') {compute()}
    arrayA = numToArray(result)
    arrayB = []
    operation = str
    oper_clicked = true
    decimal_entered = false
    console.log(str)
    screen.textContent = result.toString()
  }
}

function compute() {
  var num1 = arrayToNum(arrayA)
  var num2 = arrayToNum(arrayB)
  
  //Calculate the result using the correct operator
  if (operation === '+' || operation === '') {
    result = add(num1, num2)
  }
  else if (operation === '-') {
    result = subtract(num1, num2)
  }
  else if (operation === '*') {
    result = multiply(num1, num2)
  }
  else if (operation === '/') {
    result = divide(num1, num2)
  }
  
  result = Math.round(result*Math.pow(10,10))/Math.pow(10,10)
  
  console.log(result)
}

function reset() {
  //Reset parameters for new equation to be entered
  arrayA = []
  arrayB = []
  operation = ''
  oper_clicked = false
  decimal_entered = false
  result = 0
  screen.textContent = ''
}

//$('.button').click(function () {
//    console.log("The user clicked the button....")
//})
