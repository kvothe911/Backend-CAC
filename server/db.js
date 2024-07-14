import mysql from "mysql2";

export const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "qwerty12345",
  database: "dbproject",
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to database:", error.stack);
    return;
  }
  console.log("Connected as id " + connection.threadId);
});

const sql = "CREATE DATABASE IF NOT EXISTS prueba";

connection.query(sql, (err, results) => {
  if (err) {
    console.error("Error al cargar la base de datos", err);
    return;
  }

  console.log("Base de datos CREADA/EXISTENTE");

  connection.changeUser({ database: "prueba" }, (err) => {
    if (err) {
      console.error("Error al cambiar de base de datos", err);
      return;
    }

    const createTableQuery = {};
  });
});
