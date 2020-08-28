//数组迭代
var arr = [1, 5, 6, 3, 4, 2];

//1. forEach  
arr.forEach(function(item, index){
    console.log(item,index);
    console.log(arr)
})
//1 0, 5 1, 6 2, 3 3, 4 4, 2 5  

//2. map  
var newArr = arr.map(function(item, index){
    return item*2
})
console.log(newArr)
//[2, 10, 12, 6, 8, 4]

//3. filter
var newArr = arr.filter(function(item, index){
    return item > 5
})
console.log(newArr)

//4. reduce  
var result = arr.reduce(function(prev, next){
    return prev + next
})
console.log(result)

//5. every
var result = arr.every(function(item, index){
    return item > 1
})
console.log(result)

//6.some
var result = arr.some(function(item, index){
    return item > 3
})
console.log(result)