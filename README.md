# Exercício Docker Compose — App Node + Postgres + pgAdmin + Nginx

Ambiente Docker Compose para a API "Gestão Escolar" (Express + Knex + PostgreSQL), baseada em
[profdiegocbcastro/programacao-web — Backend/Knex/src](https://github.com/profdiegocbcastro/programacao-web/tree/main/Backend/Knex/src).

## Estrutura

```
exercicio-docker-compose/
├─ docker-compose.yml
├─ .env
├─ app/
│  ├─ Dockerfile
│  ├─ package.json
│  └─ src/            (código original do repositório, com connection.js adaptado para variáveis de ambiente)
├─ pgadmin/
│  ├─ Dockerfile
│  └─ servers.json    (pré-cadastra a conexão com o Postgres do compose)
└─ nginx/
   ├─ Dockerfile
   └─ nginx.conf       (proxy reverso: porta 80 → app:3000)
```

## Serviços

| Serviço  | Descrição                                   | Porta host |
|----------|----------------------------------------------|------------|
| `db`     | PostgreSQL 15, dados persistidos em volume    | 5434       |
| `app`    | API Node/Express/Knex                         | (interna)  |
| `pgadmin`| Interface web para o Postgres                 | 5050       |
| `nginx`  | Proxy reverso para a app                      | 80         |

Todos na mesma rede `escolar_net`. Variáveis (usuário/senha do banco, credenciais do pgAdmin, portas) vêm do `.env`.

## Como rodar

```bash
docker compose up -d --build
```

Acesse:
- `http://localhost/api-docs` — Swagger da API, servido através do Nginx
- `http://localhost/api/alunos` — endpoint da API
- `http://localhost:5050` — pgAdmin (login: `admin@admin.com` / `admin`; ao expandir o servidor "Postgres Escolar (Docker)", a senha do banco é `admin`)

Para derrubar tudo:

```bash
docker compose down
```

## Prints exigidos pela atividade

- <img width="1388" height="200" alt="image" src="https://github.com/user-attachments/assets/b6d0757c-fb4e-42fc-83f9-d4d1b4747095" />

- <img width="1853" height="992" alt="image" src="https://github.com/user-attachments/assets/115c27cf-a53a-422d-aad2-48ff5eedb425" />

- <img width="1735" height="645" alt="image" src="https://github.com/user-attachments/assets/7b382d0d-a831-4b37-b50f-52c1238d2819" />


> Todo o fluxo acima foi validado de ponta a ponta nesta máquina: build das 3 imagens, subida dos 4 containers, chamada `POST /api/alunos` através do Nginx e conferência do registro direto no pgAdmin.
