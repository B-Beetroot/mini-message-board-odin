const pool = require("./pool");

async function main() {
  await pool.query(`
    DROP TABLE IF EXISTS messages;

    CREATE TABLE messages (
      id SERIAL PRIMARY KEY,
      user_name VARCHAR(50) NOT NULL,
      text TEXT NOT NULL,
      added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    INSERT INTO messages (user_name, text)
    VALUES
      ('Amando', 'Hi there!'),
      ('Charles', 'Hello World!');
  `);

  console.log("Database populated.");

  await pool.end();
}

main().catch(console.error);