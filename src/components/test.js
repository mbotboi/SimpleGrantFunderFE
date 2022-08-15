
// const x = 10000000000000000000000
// console.log(String(x))
// const splitAt = String(x).length - 18
// const xxx = String(x).slice(0, splitAt) + '.' +String(x).slice(splitAt,splitAt+2)
// console.log(xxx)

const ethers = require('ethers')


const x = ethers.utils.formatEther(ethers.utils.parseEther("1.00000000000001"))
// console.log(ethers.utils.parseEther("1.00000000000001").toString())
console.log(typeof(x))
console.log(Number(x).toFixed(2))