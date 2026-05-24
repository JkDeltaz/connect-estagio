import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'connectestagio',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;
    if (!name || !email || !password || !userType) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'E-mail já cadastrado.' });
    }

    let companyId = null;
    if (userType === 'empresa') {
      const [companyResult] = await pool.query(
        'INSERT INTO companies (name, industry, about, vacancies) VALUES (?, ?, ?, ?)',
        [name, '', '', 0]
      );
      companyId = companyResult.insertId;
    }

    try {
      const [result] = await pool.query(
        'INSERT INTO users (name, email, password, user_type, company_id) VALUES (?, ?, ?, ?, ?)',
        [name, email, password, userType, companyId]
      );
      return res.status(201).json({ id: result.insertId, name, email, userType, companyId });
    } catch (innerError) {
      if (innerError.code === 'ER_BAD_FIELD_ERROR' && innerError.sqlMessage.includes('company_id')) {
        const [result] = await pool.query(
          'INSERT INTO users (name, email, password, user_type) VALUES (?, ?, ?, ?)',
          [name, email, password, userType]
        );
        return res.status(201).json({ id: result.insertId, name, email, userType, companyId: null });
      }
      throw innerError;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
    }

    try {
      const [rows] = await pool.query('SELECT id, name, email, user_type, company_id FROM users WHERE email = ? AND password = ?', [email, password]);
      if (rows.length === 0) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }
      const user = rows[0];
      return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.user_type,
        companyId: user.company_id,
      });
    } catch (innerError) {
      if (innerError.code === 'ER_BAD_FIELD_ERROR' && innerError.sqlMessage.includes('company_id')) {
        const [rows] = await pool.query('SELECT id, name, email, user_type FROM users WHERE email = ? AND password = ?', [email, password]);
        if (rows.length === 0) {
          return res.status(401).json({ error: 'Credenciais inválidas.' });
        }
        const user = rows[0];
        return res.json({
          id: user.id,
          name: user.name,
          email: user.email,
          userType: user.user_type,
          companyId: null,
        });
      }
      throw innerError;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao fazer login.' });
  }
});

app.get('/api/companies', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM companies ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar empresas.' });
  }
});

app.get('/api/companies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM companies WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Empresa não encontrada.' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar empresa.' });
  }
});

app.post('/api/companies', async (req, res) => {
  try {
    const userType = req.headers['x-user-type'];
    if (userType !== 'empresa') {
      return res.status(403).json({ error: 'Apenas empresas podem cadastrar empresas.' });
    }

    const { name, industry, about, vacancies } = req.body;
    if (!name || !industry || !about) {
      return res.status(400).json({ error: 'Nome, indústria e descrição são obrigatórios.' });
    }
    const [result] = await pool.query(
      'INSERT INTO companies (name, industry, about, vacancies) VALUES (?, ?, ?, ?)',
      [name, industry, about, vacancies || 0]
    );
    const [companyRows] = await pool.query('SELECT * FROM companies WHERE id = ?', [result.insertId]);
    res.status(201).json(companyRows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar empresa.' });
  }
});

app.put('/api/companies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userType = req.headers['x-user-type'];
    const requesterCompanyId = Number(req.headers['x-company-id']);
    if (userType !== 'empresa' || requesterCompanyId !== Number(id)) {
      return res.status(403).json({ error: 'Apenas a empresa dona deste cadastro pode editá-lo.' });
    }

    const { name, industry, about, vacancies } = req.body;
    await pool.query(
      'UPDATE companies SET name = ?, industry = ?, about = ?, vacancies = ? WHERE id = ?',
      [name, industry, about, vacancies || 0, id]
    );
    const [companyRows] = await pool.query('SELECT * FROM companies WHERE id = ?', [id]);
    res.json(companyRows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar empresa.' });
  }
});

app.delete('/api/companies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userType = req.headers['x-user-type'];
    const requesterCompanyId = Number(req.headers['x-company-id']);
    if (userType !== 'empresa' || requesterCompanyId !== Number(id)) {
      return res.status(403).json({ error: 'Apenas a empresa dona deste cadastro pode excluí-lo.' });
    }
    await pool.query('DELETE FROM companies WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir empresa.' });
  }
});

app.get('/api/jobs', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT j.*, c.name AS companyName, c.industry AS companyIndustry
       FROM jobs j
       LEFT JOIN companies c ON j.company_id = c.id
       ORDER BY j.id DESC`
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar vagas.' });
  }
});

app.post('/api/jobs', async (req, res) => {
  try {
    const { title, location, description, type, area, companyId } = req.body;
    if (!title || !location || !description || !type || !area || !companyId) {
      return res.status(400).json({ error: 'Todos os campos da vaga são obrigatórios.' });
    }
    const [result] = await pool.query(
      'INSERT INTO jobs (title, location, description, type, area, company_id) VALUES (?, ?, ?, ?, ?, ?)',
      [title, location, description, type, area, companyId]
    );
    const [jobRows] = await pool.query('SELECT * FROM jobs WHERE id = ?', [result.insertId]);
    res.status(201).json(jobRows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar vaga.' });
  }
});

app.put('/api/jobs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, location, description, type, area, companyId } = req.body;
    await pool.query(
      'UPDATE jobs SET title = ?, location = ?, description = ?, type = ?, area = ?, company_id = ? WHERE id = ?',
      [title, location, description, type, area, companyId, id]
    );
    const [jobRows] = await pool.query('SELECT * FROM jobs WHERE id = ?', [id]);
    res.json(jobRows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar vaga.' });
  }
});

app.delete('/api/jobs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM jobs WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir vaga.' });
  }
});

app.get('/api/applications', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT a.*, j.title AS jobTitle, c.name AS companyName
       FROM applications a
       LEFT JOIN jobs j ON a.job_id = j.id
       LEFT JOIN companies c ON j.company_id = c.id
       ORDER BY a.id DESC`
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar candidaturas.' });
  }
});

app.post('/api/applications', async (req, res) => {
  try {
    const { candidateName, candidateEmail, jobId } = req.body;
    if (!candidateName || !candidateEmail || !jobId) {
      return res.status(400).json({ error: 'Nome, email e vaga são obrigatórios.' });
    }
    const [result] = await pool.query(
      'INSERT INTO applications (candidate_name, candidate_email, job_id, status) VALUES (?, ?, ?, ?)',
      [candidateName, candidateEmail, jobId, 'Novo']
    );
    const [applicationRows] = await pool.query('SELECT * FROM applications WHERE id = ?', [result.insertId]);
    res.status(201).json(applicationRows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao cadastrar candidatura.' });
  }
});

app.put('/api/applications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await pool.query('UPDATE applications SET status = ? WHERE id = ?', [status || 'Em Análise', id]);
    const [applicationRows] = await pool.query('SELECT * FROM applications WHERE id = ?', [id]);
    res.json(applicationRows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar candidatura.' });
  }
});

app.delete('/api/applications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM applications WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir candidatura.' });
  }
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port}`);
});
