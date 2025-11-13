import mysql from 'mysql';
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});
db.connect((err) => {
    if (err)
        console.error("DB Connection Error:", err);
    else
        console.log("Connected to database");
});
export { db };
