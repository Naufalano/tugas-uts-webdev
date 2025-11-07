const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');

const dataDir = path.resolve(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}
const dbPath = path.resolve(dataDir, 'database.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database at', dbPath);
    createTables();
  }
});

function createTables() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )
    `, (err) => {
      if (err) {
        console.error("Error creating users table", err.message);
      } else {
        const defaultUser = 'admin';
        const defaultPass = 'admin123';
        
        db.get('SELECT * FROM users WHERE username = ?', [defaultUser], (err, row) => {
          if (!row) {
            bcrypt.hash(defaultPass, 10, (err, hash) => {
              if (err) {
                console.error("Error hashing password", err);
                return;
              }
              db.run('INSERT INTO users (username, password) VALUES (?, ?)', [defaultUser, hash], (err) => {
                if (err) {
                  console.error("Error inserting default admin user", err.message);
                } else {
                  console.log(`Default user 'admin' created with password 'admin123'.`);
                }
              });
            });
          }
        });
      }
    });

    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nama TEXT NOT NULL,
        deskripsi TEXT,
        gambar_url TEXT NOT NULL
      )
    `, (err) => {
      if (err) {
        console.error("Error creating products table", err.message);
      }
    });
  });
}

module.exports = db;