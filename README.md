# 🚀 ConnectEstágio - Plataforma de Recrutamento

O **ConnectEstágio** é uma aplicação web desenvolvida para simplificar a conexão entre empresas em busca de novos talentos e estudantes à procura de sua primeira experiência profissional. A plataforma permite o gerenciamento completo de vagas e candidaturas em um ambiente intuitivo.

---

## 📌 Sobre o Projeto

Este projeto foi concebido para ser uma solução leve e funcional, utilizando tecnologias fundamentais da web para garantir performance e facilidade de manutenção em um ambiente de Front-end puro.

### Principais Funcionalidades
* **Para Candidatos:** Cadastro de perfil acadêmico, busca inteligente de vagas e aplicação com um clique.
* **Para Empresas:** Publicação de oportunidades, gestão de candidatos inscritos e controle de status das vagas.
* **Filtros Avançados:** Filtragem por modalidade (Remoto/Presencial), curso e palavras-chave.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando o trio fundamental do desenvolvimento Web:

* **HTML5:** Estruturação semântica do conteúdo.
* **CSS3:** Estilização moderna com Flexbox e Grid para responsividade.
* **JavaScript (ES6+):** Lógica de manipulação do DOM, filtragem dinâmica e persistência via `localStorage`.

---

## 📋 Backlog do Produto

Abaixo está a organização das funcionalidades divididas por épicos e prioridades:

| Épico | ID | História de Usuário (User Story) | Status |
| :--- | :---: | :--- | :---: |
| **Gestão de Contas** | US01 | Como candidato, quero me cadastrar com curso e semestre para que empresas me vejam. | ⏳ Pendente |
| **Gestão de Contas** | US02 | Como empresa, quero criar um perfil institucional com descrição e setor. | ⏳ Pendente |
| **Gestão de Contas** | US03 | Como usuário, quero realizar login para acessar as áreas restritas do sistema. | ⏳ Pendente |
| **Painel da Empresa** | US04 | Como empresa, quero publicar vagas com requisitos, bolsa e carga horária. | ⏳ Pendente |
| **Painel da Empresa** | US05 | Como empresa, quero visualizar a lista de candidatos inscritos em cada vaga. | ⏳ Pendente |
| **Painel da Empresa** | US06 | Como empresa, quero encerrar uma vaga após finalizar o processo seletivo. | ⏳ Pendente |
| **Candidato** | US07 | Como candidato, quero buscar vagas por palavras-chave ou curso. | ⏳ Pendente |
| **Candidato** | US08 | Como candidato, quero filtrar vagas por modalidade (Remoto ou Presencial). | ⏳ Pendente |
| **Candidato** | US09 | Como candidato, quero me candidatar a uma vaga e receber confirmação visual. | ⏳ Pendente |
| **Interface (UI/UX)** | US10 | Como usuário, quero que o site seja responsivo para acesso via celular. | ⏳ Pendente |

---

## 🚀 Como Executar o Projeto

1.  **Clone este repositório:**
    ```bash
    git clone [https://github.com/JkDeltaz/connect-estagio.git](https://github.com/JkDeltaz/connect-estagio.git)
    ```
2.  **Navegue até a pasta do projeto:**
    ```bash
    cd connect-estagio
    ```
3.  **Abra o arquivo no navegador:**
    Basta abrir o arquivo `index.html` em seu navegador de preferência ou utilizar a extensão **Live Server** no VS Code.

---

## 🏗️ Estrutura de Arquivos

```text
/
├── index.html          # Página principal (Home e Login)
├── dashboard.html      # Painel administrativo (Candidato/Empresa)
├── /css
│   └── style.css       # Estilização global e regras de responsividade
├── /js
│   ├── main.js         # Lógica de renderização e filtros
│   ├── auth.js         # Simulação de login e níveis de acesso
│   └── storage.js      # Funções para salvar/ler dados do localStorage
└── /assets             # Imagens, ícones e logotipos
