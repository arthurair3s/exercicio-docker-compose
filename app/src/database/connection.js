const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'admin',
    database: process.env.DB_NAME || 'db_gestao_escolar'
  }
});
module.exports = db;

// Inicializa as tabelas no Postgres
async function initDb() {
  if (!await db.schema.hasTable('alunos')) {
    await db.schema.createTable('alunos', t => {
      t.increments('id').primary();
      t.string('nome').notNullable();
      t.string('email').unique().notNullable();
    });
  }
  if (!await db.schema.hasTable('cursos')) {
    await db.schema.createTable('cursos', t => {
      t.increments('id').primary();
      t.string('nome').notNullable();
      t.integer('cargaHoraria').notNullable();
    });
  }
  if (!await db.schema.hasTable('matriculas')) {
    await db.schema.createTable('matriculas', t => {
      t.increments('id').primary();
      t.integer('aluno_id').references('id').inTable('alunos').onDelete('CASCADE');
      t.integer('curso_id').references('id').inTable('cursos').onDelete('CASCADE');
    });
  }
  console.log("Banco PostgreSQL pronto no Docker!");
}
initDb();
module.exports = db;
