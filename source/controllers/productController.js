const { ProductController } = require('.')
const {queryDB}=require('../database/service')
const {helper}=require('../helper')

const home = async(req, res) => {
    let {id}=req.params
    let {page}=req.query  
    if(!page){
        page=1
    }
    else{
        page=parseInt(page)
    }

    if(!id){
        const allOrder=await queryDB(`select top(${page*10}) * from sanpham a JOIN LOAISP b on a.MALOAI=b.MALOAI`)
        const quantityProduct = await queryDB(`select COUNT(*) from SANPHAM`)
        const category=await queryDB(`SELECT * FROM LOAISP`)
        let result=allOrder.recordset.slice(page*10-10,allOrder.recordset.length)
        
        res.render('product',{
            allOrder:result,
            formatNumber:helper.formatNumber,
            quantityProduct:quantityProduct.recordset[0][''],
            randomDate:helper.randomDate,
            currentPage:page,
            category:category.recordset,
            quantityPage:allOrder.recordset.length,
            tittle:'Tất cả sản phẩm',
            active:-1
        })
    }
    else{
        const allOrder=await queryDB(`select top(${page*10}) * from sanpham a JOIN LOAISP b on a.MALOAI=b.MALOAI WHERE b.MALOAI='${id}'`)
        const quantityProduct = await queryDB(`select COUNT(*) from SANPHAM WHERE MALOAI='${id}'`)
        const category=await queryDB(`SELECT * FROM LOAISP`)
        const tittle=await queryDB(`SELECT * FROM LOAISP WHERE MALOAI='${id}'`)
        
        let result=allOrder.recordset.slice(page*10-10,allOrder.recordset.length)
        
        res.render('product',{
            allOrder:result,
            formatNumber:helper.formatNumber,
            quantityProduct:quantityProduct.recordset[0][''],
            randomN:helper.randomN,
            randomDate:helper.randomDate,
            currentPage:page,
            category:category.recordset,
            quantityPage:allOrder.recordset.length,
            tittle:tittle.recordset[0].TENLOAI,
            active:2
        })
    }
    
}
const addProduct = async(req, res) => {
    const category=await queryDB(`select * from LOAISP`)
    res.render('product-add',{
        category:category.recordset,
        message:'',
        masp:''
    })
}
const detail = async(req, res) => {

    const product=await queryDB(`SELECT * FROM SANPHAM A JOIN LOAISP B ON A.MALOAI=B.MALOAI WHERE MASP='${req.params.id}'`)
    if(product.recordset.length===0){
        return res.render('404')
    }
    res.render('product-detail',{
        product:product.recordset[0],
        formatNumber:helper.formatNumber,
        masp:req.params.id
    })
}
const saveProduct=async(req,res)=>{
    const findProduct=await queryDB(`SELECT * FROM SANPHAM WHERE MASP='${req.body.masp}'`)
    if(findProduct.recordset.length>0){
        const category=await queryDB(`select * from LOAISP`)
        return res.render('product-add',{
            category:category.recordset,
            message:'Mã sản phẩm đã tồn tại',
            masp:req.body.masp
        })
    }
    let filename='/uploads/'+req.file.filename
    const result=await queryDB(`
        insert into sanpham (MASP,TENSP,GIABAN,TENTHUONGHIEU,IMAGEURL,MOTASP,MALOAI,SOLUONGTON)
        VALUES ('${req.body.masp}',N'${req.body.name}',${parseInt(req.body.price)},N'${req.body.vendor}','${filename}',N'${req.body.des}','${req.body.category}',${parseInt(req.body.quantity)})
    `)
    console.log(result)
    res.redirect('/product/detail/'+req.body.masp)
}
const category=async(req,res)=>{
    const category=await queryDB(`SELECT A.MALOAI,A.TENLOAI,COUNT(*) AS SOLUONG
                                FROM LOAISP A LEFT JOIN SANPHAM B ON A.MALOAI=B.MALOAI 
                                GROUP BY A.TENLOAI,A.MALOAI`)
    res.render('category',{
        category:category.recordset,
        formatNumber:helper.formatNumber,
    })
}
const saveCategory=async (req,res)=>{
    let {maloai,name}=req.body
    while(maloai.includes(' ')){
        maloai=maloai.replace(' ','_')
    }
    console.log(maloai)
    const findCate=await queryDB(`SELECT * FROM LOAISP WHERE MALOAI='${maloai}'`)

    if(findCate.recordset.length>0){
        let category=await queryDB(`SELECT A.MALOAI,A.TENLOAI,COUNT(*) AS SOLUONG
                                FROM LOAISP A LEFT JOIN SANPHAM B ON A.MALOAI=B.MALOAI 
                                GROUP BY A.TENLOAI,A.MALOAI`)
        return res.render('category-save',{
            category:category.recordset,
            formatNumber:helper.formatNumber,
            message:'Mã loại đã tồn tại',
            success:false,
            name,
            maloai
        })
    }
    const result=await queryDB(`INSERT INTO LOAISP (MALOAI,TENLOAI) VALUES ('${maloai}',N'${name}')`)
    console.log(result)
    let category=await queryDB(`SELECT A.MALOAI,A.TENLOAI,COUNT(*) AS SOLUONG
                                FROM LOAISP A LEFT JOIN SANPHAM B ON A.MALOAI=B.MALOAI 
                                GROUP BY A.TENLOAI,A.MALOAI`)
    return res.render('category-save',{
        category:category.recordset,
        formatNumber:helper.formatNumber,
        message:'Thêm sản phẩm thành công',
        success:true,
        name,
        maloai
    })
}


module.exports = {
    home,
    addProduct,
    saveProduct,
    detail,
    category,
    saveCategory,

}
