import express from 'express';
import sql, { ConnectionPool } from 'mssql';

const app = express();

const config = {
  user: 'your-username',
  password: 'your-password',
  server: 'your-server-address',
  database: 'your-database-name',
};

const pool = new ConnectionPool(config);
const poolConnect = pool.connect();

poolConnect.then((pool) => {
  console.log('Connected to SQL Server');
});

app.get('/api/data', async (req, res) => {
  try {
    const request = new sql.Request(pool);
    const result = await request.query('SELECT * FROM your_table');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
