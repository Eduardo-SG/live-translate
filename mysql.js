// Importa la biblioteca mysql
const mysql = require('mysql');

// Crea una conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'live-translate'
});

connection.connect((err) =>{
    if(err) throw err
    console.log("conexion exitosa")
});

connection.query('select * from translation_history', (err, rows) =>{
    if(err) throw err
    console.log("los datos son estos: ");
    console.log(rows);
    console.log("numero de registros: ");
    console.log(rows.length);
    const trans = rows[1];
    console.log(`texto original: ${trans.inputText}`);
    console.log(`texto traducido: ${trans.outputText}`);
    console.log(`fecha: ${trans.date}`);
    
})

connection.end();