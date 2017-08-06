var my_max = function(arr) {
    return Math.max(arr)
}



function vowel_count(str) {
    var vowels = ['a','e','i','o','u','y']
    var sum = 0
    var length = vowels.length
    for (var i = 0; i < length; i++) {
        sum += str.split(vowels[i]).length - 1
    }
    return sum
}



function reverse(str) {
    var arr = []
    for (var i = str.length - 1; i >= 0; i--) {
        arr.push(str[i])
    }
    return arr
}




