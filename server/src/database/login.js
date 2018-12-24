const { Client } = require("pg");

module.exports = async ({ username, password }) => {
  try {
    const database = new Client({
      user: "blogdb",
      host: "localhost",
      database: "blogdb",
      password: "blogdb123",
      port: 5432
    });

    await database.connect();
    const response = await database.query(
      `select * from users where name = $1 and password = $2`,
      [username, password]
    );
    await database.end();

    if (response.rows.length === 0) return false;
    else return response.rows[0];
  } catch (error) {
    console.error(error);
  }
};
