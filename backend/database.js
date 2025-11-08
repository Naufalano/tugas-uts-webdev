const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

console.log('[db] __dirname =', __dirname);

const dataDir = path.resolve(__dirname, 'data');
console.log('[db] resolved dataDir =', dataDir);

try {
  if (!fs.existsSync(dataDir)) {
    console.log('[db] creating dataDir:', dataDir);
    fs.mkdirSync(dataDir, { recursive: true });
  }
  try {
    fs.accessSync(dataDir, fs.constants.R_OK | fs.constants.W_OK);
    console.log('[db] dataDir is readable/writable');
  } catch (permErr) {
    console.warn('[db] dataDir permission problem:', permErr.message);
  }
} catch (e) {
  console.error('[db] error ensuring dataDir:', e?.message || e);
}

const dbPath = path.resolve(dataDir, 'database.db');
console.log('[db] using dbPath =', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('[db] Error opening database', err.message);
  } else {
    console.log('[db] Connected to the SQLite database at', dbPath);
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
          if (err) {
            console.error('Error checking default user', err.message);
            return;
          }
          if (!row) {
            const hashed = bcrypt.hashSync(defaultPass, 10);
            db.run('INSERT INTO users (username, password) VALUES (?, ?)', [defaultUser, hashed], (err) => {
              if (err) {
                console.error("Error inserting default admin user", err.message);
              } else {
                console.log(`Default user 'admin' created with password 'admin123'.`);
              }
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