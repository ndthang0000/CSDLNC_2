const {conn,sql}=require('./connectDB')

const queryDB = async(stringQuery) => {
    const pool = await conn

    return await pool.request().query(stringQuery)
}



module.exports={
    queryDB
}