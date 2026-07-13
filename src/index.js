const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const fs = require('fs');
const express = require('express');
const mysql = require('mysql2/promise');
const { createTables } = require('./db/schema');
const { seedSampleData } = require('./db/sampleData');

const app = express();
const APP_PORT = parseInt(process.env.APP_PORT || '3000', 10);
const frontendDist = path.join(__dirname, '..', 'frontend', 'dist');

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'test',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000,
};

let pool = null;

function getPool() {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

app.use(express.json());

app.get('/api/db/check', async (req, res) => {
  try {
    const connection = await getPool().getConnection();
    await connection.ping();
    connection.release();
    res.status(200).json({
      ok: true,
      message: 'Database connection successful',
      database: dbConfig.database,
    });
  } catch (err) {
    res.status(503).json({
      ok: false,
      message: 'Database connection failed',
      error: err.message,
      code: err.code || null,
    });
  }
});

app.get('/api/db/tables', async (req, res) => {
  try {
    const connection = await getPool().getConnection();
    const [rows] = await connection.execute(
      'SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? ORDER BY TABLE_NAME',
      [dbConfig.database]
    );
    connection.release();
    const tables = rows.map((row) => row.TABLE_NAME);
    res.status(200).json({
      ok: true,
      database: dbConfig.database,
      count: tables.length,
      tables,
    });
  } catch (err) {
    res.status(503).json({
      ok: false,
      message: 'Failed to fetch table list',
      error: err.message,
      code: err.code || null,
    });
  }
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ ok: true, service: 'api-server-all' });
});

app.post('/api/db/setup-tables', async (req, res) => {
  try {
    const connection = await getPool().getConnection();
    const tables = await createTables(connection);
    connection.release();
    res.status(200).json({
      ok: true,
      message: 'Tables created successfully',
      database: dbConfig.database,
      tables,
    });
  } catch (err) {
    res.status(503).json({
      ok: false,
      message: 'Failed to create tables',
      error: err.message,
      code: err.code || null,
    });
  }
});

app.post('/api/db/seed-sample-data', async (req, res) => {
  try {
    const connection = await getPool().getConnection();
    const counts = await seedSampleData(connection);
    connection.release();
    res.status(200).json({
      ok: true,
      message: 'Sample data inserted successfully',
      database: dbConfig.database,
      counts,
    });
  } catch (err) {
    res.status(503).json({
      ok: false,
      message: 'Failed to insert sample data',
      error: err.message,
      code: err.code || null,
    });
  }
});

// 빌드된 React 앱 정적 서빙 (빌드 후 /api 가 아닌 요청은 프론트엔드로)
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
} else {
  app.use((req, res) => {
    res.status(404).json({ ok: false, message: 'Not Found' });
  });
}

app.listen(APP_PORT, () => {
  console.log(`Server running at http://localhost:${APP_PORT}`);
  console.log(`DB: ${dbConfig.host}:${dbConfig.port} / ${dbConfig.database} (user: ${dbConfig.user})`);
});
