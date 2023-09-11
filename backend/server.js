import express from 'express';
import sql from 'mssql';

const app = express();

const config = {
  user: 'sa',
  password: 'sa',
  server: 'TAHABOY',
  database: 'TestDb',
  options: {
    trustServerCertificate: true, // Accept self-signed certificate
  },
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

poolConnect.then((pool) => {
  console.log('Connected to SQL Server');
});

app.get('/api/data', async (req, res) => {
  try {
    const request = new sql.Request(pool);
    const result = await request.query('SELECT * FROM CATEGORY');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
