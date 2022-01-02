const sql = require('mssql/msnodesqlv8')
const config = {
  user: 'sa',
  password: 'ducthang123456',
  server: 'localhost\\SQLEXPRESS',
  database: 'CONCUNG',
  driver: 'msnodesqlv8'
}

const connectDB = new sql.ConnectionPool(config).connect().then(pool => pool)

module.exports = {
  conn: connectDB,
  sql
}
