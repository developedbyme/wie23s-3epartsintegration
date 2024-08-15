// Import the Express module
const path = require('path');
const express = require('express');
const mysql = require('mysql2/promise');

const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '.env') });

let run = async function () {
  const pool = await mysql.createPool({
    host: 'mysql-28cd133a-wie23s-3epart.l.aivencloud.com',
    port: 21549,
    user: 'avnadmin',
    password: process.env.DB_PASSWORD,
    database: 'defaultdb',
  });

  //await pool.query('CREATE TABLE test (id int NOT NULL, name varchar(255), PRIMARY KEY (id))');
  const [rows, fields] = await pool.query('SELECT * FROM test');
  console.log(rows, fields);
  
  // Create an instance of Express
  const app = express();
  
  // Define a route handler for the root URL ('/')
  app.get('/', (req, res) => {
    let getData = async function () {
    const [rows, fields] = await pool.query('SELECT * FROM test');
    res.send(JSON.stringify(rows) + " " +  JSON.stringify(fields));
    }
    getData();
  });
  
  
  // Start the server on port 3000
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

run();
