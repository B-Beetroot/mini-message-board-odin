const pool = require("./pool");

async function getMessages() {
  const { rows } = await pool.query(
    "SELECT * FROM messages ORDER BY added DESC"
  );

  return rows;
}

async function getMessage(id) {
  const { rows } = await pool.query(
    "SELECT * FROM messages WHERE id = $1",
    [id]
  );

  return rows[0];
}

async function createMessage(user, text) {
  await pool.query(
    "INSERT INTO messages(user_name, text) VALUES($1, $2)",
    [user, text]
  );
}

module.exports = {
  getMessages,
  getMessage,
  createMessage,
};