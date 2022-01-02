const { queryDB } = require('../database/service')
const {helper}=require('../helper')

const home = async(req, res) => {







  // const allProduct=await queryDB(`SELECT * FROM SANPHAM`)

  // for(let i=0;allProduct.recordset.length;i++){
  //   let name='Sản phẩm '+i
  //   await queryDB(`UPDATE SANPHAM SET SOLUONGTON=${Math.floor(Math.random() * 500)} WHERE MASP='${allProduct.recordset[i].MASP}'`)
  //   await queryDB(`UPDATE SANPHAM SET SOLUONGBAN=${Math.floor(Math.random() * 100)} WHERE MASP='${allProduct.recordset[i].MASP}'`)
  //   await queryDB(`UPDATE SANPHAM SET TENSP=N'${name}' WHERE MASP='${allProduct.recordset[i].MASP}'`)
  // }
  //test
  let date=helper.formatDate(Date.now())
  date=date.split('/')
  let tempDate=parseInt(date[1])-7<0?1:parseInt(date[1])-7
  let newDate=date[2]+'-'+date[0]+'-'+tempDate
  const sales=await queryDB(`SELECT SUM(A.TIENHANG) AS SUM FROM DONHANG A WHERE A.NGAYLAP>='${newDate}'`)
  const quantityUser=await queryDB('select COUNT(*) from khachhang')
  const quantityProduct = await queryDB(`select COUNT(*) from SANPHAM`)
  const quantityStore=await queryDB(`select count(*) from cuahang`)
  const quantityOrder=await queryDB(`SELECT count(*) AS SUM FROM DONHANG WHERE NGAYLAP>='${newDate}'`)

  res.render('dashboard',{
    quantityUser:quantityUser.recordset[0][''],
    quantityProduct:quantityProduct.recordset[0][''],
    quantityStore:quantityStore.recordset[0][''],
    quantityOrder:quantityOrder.recordset[0]['SUM'],
    sales:sales.recordset[0]['SUM'],
    formatNumber:helper.formatNumber
  })
}
module.exports = {
  home
}
