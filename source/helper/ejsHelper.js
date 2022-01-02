const moment =require('moment')

function formatNumber (n) {
    return n.toFixed(0).replace(/./g, function (c, i, a) {
        return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c
    })
}
function randomN(n){
    return Math.floor(Math.random() * n) + 1
}

function randomDate(n){
    return new Date()
}
function formatDate(n){
    return moment(n).format('L')
}

module.exports={
    formatNumber,
    randomN,
    randomDate,
    formatDate
}