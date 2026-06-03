📚 Sistema de Gerenciamento Escolar
Sobre o Projeto

Este projeto consiste em um sistema de gerenciamento escolar desenvolvido com Next.js e TypeORM, como parte de um Projeto Interdisciplinar acadêmico.

A aplicação implementa operações de CRUD (Create, Read, Update e Delete) para gerenciamento de informações escolares, permitindo o cadastro, consulta, atualização e remoção de registros em um banco de dados PostgreSQL.

O principal objetivo é demonstrar a aplicação prática dos conceitos estudados durante a graduação, incluindo desenvolvimento web full stack, persistência de dados, integração com banco de dados relacional e implantação em ambiente de produção.

Tecnologias Utilizadas
Desenvolvimento
Next.js
React
TypeScript
Banco de Dados
PostgreSQL
TypeORM
Infraestrutura
Neon PostgreSQL
Vercel
Funcionalidades
Cadastro de registros escolares
Consulta e listagem de dados
Atualização de informações
Exclusão de registros
Persistência de dados em PostgreSQL
Interface web responsiva
Arquitetura

O projeto segue uma arquitetura organizada baseada na separação de responsabilidades:

src/
├── app/
├── components/
├── controllers/
├── services/
├── entities/
├── database/
├── types/
└── utils/
Instalação
1. Clonar o repositório
git clone <url-do-repositorio>
cd projeto-gerenciamento-escolar
2. Instalar as dependências
npm install
3. Configurar as variáveis de ambiente

Crie um arquivo .env.local:

DATABASE_URL=postgresql://usuario:senha@host/database
4. Executar o projeto
npm run dev

A aplicação estará disponível em:

http://localhost:3000
Deploy
Aplicação

O deploy da aplicação é realizado através da plataforma Vercel.

Banco de Dados

O banco PostgreSQL está hospedado na plataforma Neon.

Objetivo Acadêmico

Este projeto foi desenvolvido exclusivamente para fins acadêmicos, visando a aplicação prática dos conhecimentos adquiridos ao longo do curso, especialmente nos temas:

Desenvolvimento Web com Next.js
TypeScript
Banco de Dados Relacional
ORM (TypeORM)
Arquitetura de Software
CRUD e Persistência de Dados
Deploy em Ambiente de Produção
Considerações Finais

Por se tratar de um MVP acadêmico, o foco principal está na implementação das funcionalidades essenciais e na demonstração dos conceitos técnicos envolvidos no desenvolvimento de aplicações web modernas.

Autor

Desenvolvido para o Projeto Interdisciplinar do curso de Desenvolvimento de Software. 👨‍💻