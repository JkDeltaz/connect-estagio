# 🚀 ConnectEstágio - Plataforma de Recrutamento

O **ConnectEstágio** é uma aplicação web desenvolvida para simplificar a conexão entre empresas em busca de novos talentos e estudantes à procura de sua primeira experiência profissional. A plataforma permite o gerenciamento completo de vagas e candidaturas em um ambiente intuitivo.

---

## 🎨 Protótipo do Projeto
Você pode visualizar o design da interface e o fluxo do usuário através do link abaixo:
> 🔗 **[Link para o Protótipo no Figma](https://www.figma.com/file/seu-link-aqui)**

---

## 📌 Sobre o Projeto
Este projeto foi concebido para ser uma solução funcional utilizando tecnologias fundamentais da web para garantir performance e facilidade de manutenção em um ambiente de Front-end puro.

### Principais Funcionalidades
* **Para Candidatos:** Cadastro de perfil acadêmico, busca de vagas e aplicação rápida.
* **Para Empresas:** Publicação de oportunidades e gestão de candidatos inscritos.
* **Filtros Avançados:** Busca por modalidade (Remoto/Presencial), curso e palavras-chave.

---

## 🛠️ Tecnologias Utilizadas
* **HTML5:** Estruturação semântica.
* **CSS3:** Estilização moderna com Flexbox e Grid.
* **JavaScript (ES6+):** Lógica de manipulação do DOM e persistência via `localStorage`.

---

## 📋 Backlog do Produto (Sprints)

O desenvolvimento está dividido em 3 Sprints focadas na entrega de valor incremental:

### 🏃 Sprint 1: Base e Autenticação (MVP)
*Foco: Estrutura inicial e acesso do usuário.*

| ID | História de Usuário (User Story) | Prioridade |
| :--- | :--- | :---: |
| **US01** | Como usuário, quero realizar login para acessar as áreas restritas do sistema. | Alta |
| **US02** | Como candidato, quero me cadastrar com curso e semestre para que empresas me vejam. | Alta |
| **US03** | Como empresa, quero criar um perfil institucional com descrição e setor. | Média |

### 🏃 Sprint 2: Core de Vagas (Empresa & Candidato)
*Foco: O fluxo principal de publicação e visualização.*

| ID | História de Usuário (User Story) | Prioridade |
| :--- | :--- | :---: |
| **US04** | Como empresa, quero publicar vagas com requisitos, bolsa e carga horária. | Alta |
| **US05** | Como candidato, quero visualizar um feed de vagas atualizado em tempo real. | Alta |
| **US06** | Como candidato, quero me candidatar a uma vaga e receber confirmação visual. | Alta |
| **US07** | Como empresa, quero visualizar a lista de candidatos inscritos em cada vaga. | Média |

### 🏃 Sprint 3: Refinamento e Filtros
*Foco: Experiência do usuário e busca avançada.*

| ID | História de Usuário (User Story) | Prioridade |
| :--- | :--- | :---: |
| **US08** | Como candidato, quero buscar/filtrar vagas por modalidade (Remoto ou Presencial). | Média |
| **US09** | Como empresa, quero encerrar uma vaga após finalizar o processo seletivo. | Baixa |
| **US10** | Como usuário, quero que o site seja responsivo para acesso via celular. | Alta |

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
    Basta abrir o arquivo `index.html` na raiz do projeto ou utilizar a extensão **Live Server** no VS Code.

---

## 🏗️ Estrutura de Arquivos

```text
/
├── index.html              # Landing Page / Entrada
├── pages/                  # Telas internas
│   ├── dashboard-aluno.html
│   ├── dashboard-empresa.html
│   └── vagas.html
├── css/
│   ├── global.css          
│   └── components.css      
├── js/
│   ├── main.js             
│   ├── auth.js             
│   └── storage.js          # Lógica de LocalStorage
└── assets/                 # Imagens e ícones
