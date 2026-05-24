CREATE DATABASE IF NOT EXISTS connectestagio;
USE connectestagio;

CREATE TABLE IF NOT EXISTS companies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  industry VARCHAR(100),
  about TEXT,
  vacancies INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  user_type ENUM('estudante','empresa') NOT NULL,
  company_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL
);

ALTER TABLE users ADD COLUMN IF NOT EXISTS company_id INT NULL AFTER user_type;
ALTER TABLE users ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER company_id;

CREATE TABLE IF NOT EXISTS jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  location VARCHAR(100),
  description TEXT,
  type VARCHAR(50),
  area VARCHAR(100),
  company_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  candidate_name VARCHAR(150) NOT NULL,
  candidate_email VARCHAR(150) NOT NULL,
  job_id INT NOT NULL,
  status VARCHAR(40) DEFAULT 'Novo',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

INSERT IGNORE INTO companies (id, name, industry, about, vacancies) VALUES
(1, 'TechStart', 'Tecnologia', 'Startup focada em desenvolvimento de soluções inovadoras para o mercado digital.', 5),
(2, 'CodeLabs', 'Desenvolvimento de Software', 'Consultoria especializada em desenvolvimento web e mobile com tecnologias modernas.', 3),
(3, 'DataFlow', 'Big Data & Analytics', 'Empresa especializada em análise de dados e business intelligence para grandes empresas.', 4),
(4, 'Empresa Exemplo', 'Serviços', 'Empresa de exemplo para login de empresa.', 0);

INSERT IGNORE INTO users (id, name, email, password, user_type, company_id) VALUES
(1, 'Aluno Exemplo', 'estudante@exemplo.com', '123456', 'estudante', NULL),
(2, 'Empresa Exemplo', 'empresa@exemplo.com', '123456', 'empresa', 4);

INSERT IGNORE INTO jobs (id, title, location, description, type, area, company_id) VALUES
(1, 'UI/UX Design Intern', 'São Paulo, SP', 'Oportunidade para trabalhar com design de interfaces e experiência do usuário.', 'Remoto', 'Design', 1),
(2, 'Frontend Developer Intern', 'Rio de Janeiro, RJ', 'Desenvolvimento de aplicações web modernas com React e TypeScript.', 'Híbrido', 'Desenvolvimento', 2),
(3, 'Backend Developer Intern', 'Belo Horizonte, MG', 'Criação de APIs REST e integração com bancos de dados.', 'Presencial', 'Desenvolvimento', 3);
