const {queryDB}=require('../database/service')
const {helper}=require('../helper')


const home = async (req, res) => {
  let {page}=req.query  
  if(!page){
      page=1
  }
  else{
      page=parseInt(page)
  }
  let date=helper.formatDate(Date.now())
  date=date.split('/')
  let newDate=date[2]+'-'+date[0]+'-'+'1'

  const allOrder=await queryDB(`select top(${page*10}) * from DONHANG a JOIN KHACHHANG b on a.MAKH=b.MAKH where a.NGAYLAP>='${newDate}' and a.TRANGTHAI=0`)
  let result=allOrder.recordset.slice(page*10-10,allOrder.recordset.length)
  res.render('orders',{
    allOrder:result,
    formatNumber:helper.formatNumber,
    formatDate:helper.formatDate,
    date:false
  })
}
const date=async(req,res)=>{
  const allOrder=await queryDB(`SELECT * from DONHANG a JOIN KHACHHANG b on a.MAKH=b.MAKH WHERE a.NGAYLAP='${req.params.date}' and a.TRANGTHAI=0`)
  res.render('orders',{
    allOrder:allOrder.recordset,
    formatNumber:helper.formatNumber,
    formatDate:helper.formatDate,
    date:req.params.date
  })
}
const lastest=async(req,res)=>{
  let date=helper.formatDate(Date.now())
  date=date.split('/')
  let newDate=date[2]+'-'+date[0]+'-'+'1'
  console.log(newDate)
  const allOrder=await queryDB(`SELECT * from DONHANG a JOIN KHACHHANG b on a.MAKH=b.MAKH WHERE a.NGAYLAP>='${newDate}' AND a.TRANGTHAI=1 ORDER BY NGAYLAP DESC`)
  res.render('order-lastest',{
    allOrder:allOrder.recordset,
    formatNumber:helper.formatNumber,
    formatDate:helper.formatDate,
    date:newDate
  })
}
const accept=async(req,res)=>{
  let {id}=req.params
  const result=await queryDB(`UPDATE DONHANG set TRANGTHAI=1 WHERE MADH='${id}'`)
  console.log(result)
  res.json({success:true})
}
module.exports = {
  home,
  date,
  lastest,
  accept
}

