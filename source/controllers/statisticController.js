const { queryDB } = require('../database/service')
const {helper}=require('../helper')

const product = async(req, res) => {
    let {year}=req.query
    let data;
    if(!year){
        data=await queryDB(`SELECT A.MASP,A.SOLUONG,B.TENSP,B.IMAGEURL
        FROM (SELECT TOP(20) MASP,SUM(SOLUONG) AS SOLUONG from CT_DONHANG GROUP BY MASP ) AS A JOIN SANPHAM B ON A.MASP=B.MASP 
        ORDER BY A.SOLUONG DESC`)
        year='Tất cả các năm'
    }
    else{
        year=parseInt(year)
        data=await queryDB(`SELECT D.MASP,D.SOLUONG,E.TENSP,E.IMAGEURL
                            FROM (SELECT TOP(20) B.MASP,SUM(B.SOLUONG) AS SOLUONG
                                    FROM DONHANG A JOIN CT_DONHANG B ON A.MADH=B.MADH 
                                    WHERE YEAR(A.NGAYLAP)=${year} 
                                    GROUP BY MASP) AS D JOIN SANPHAM E ON D.MASP=E.MASP
                            ORDER BY D.SOLUONG DESC`)
        year='Năm '+year
    }
    
    res.render('statistic-product',{
        data:data.recordset,
        year:year,
        formatNumber:helper.formatNumber
    })
}
const category = async(req, res) => {
    let {year}=req.query
    let data
    if(!year){
        year='Tất cả các năm'
        data=await queryDB(`SELECT D.MALOAI,D.SOLUONG,E.TENLOAI
                            FROM (SELECT B.MALOAI,SUM(A.SOLUONG) AS SOLUONG FROM CT_DONHANG A JOIN SANPHAM B ON A.MASP=B.MASP GROUP BY B.MALOAI) AS D JOIN LOAISP E ON D.MALOAI=E.MALOAI`)
    }
    else{
        year=parseInt(year)
        data=await queryDB(`SELECT D.MALOAI,D.SOLUONG,E.TENLOAI
                            FROM (SELECT B.MALOAI,SUM(A.SOLUONG) AS SOLUONG 
                                    FROM CT_DONHANG A JOIN SANPHAM B ON A.MASP=B.MASP JOIN DONHANG F ON F.MADH=A.MADH 
                                    WHERE YEAR(F.NGAYLAP)=${year} 
                                    GROUP BY B.MALOAI) 
                            AS D JOIN LOAISP E ON D.MALOAI=E.MALOAI`)
        year='Năm '+year
    }
    console.log(data.recordset)
    res.render('statistic-category',{
        year,
        data:data.recordset,
        formatNumber:helper.formatNumber
    })
}
const sales = async(req, res) => {
    let {year}=req.query
    if(!year){
        year=2020
    }
    let data=await queryDB(`SELECT NGAYLAP,TONGTIEN FROM DONHANG WHERE YEAR(NGAYLAP)=${year}`)
    let month=[0,0,0,0,0,0,0,0,0,0,0,0]
    data.recordset.forEach(item=>{
        let newDate=new Date(item.NGAYLAP)
        month[newDate.getMonth()]+=item.TONGTIEN
    })
    console.log(data)
    res.render('statistic-sales',{
        data:month,
        year:'Năm '+year
    })
}
module.exports = {
    product,
    category,
    sales
}
