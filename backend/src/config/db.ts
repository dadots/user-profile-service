import mysql from 'mysql';

const db: mysql.Connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

db.connect((err: mysql.MysqlError | null) => {
    if (err) console.error("DB Connection Error:", err);
    else console.log("Connected to database");
});

export { db };