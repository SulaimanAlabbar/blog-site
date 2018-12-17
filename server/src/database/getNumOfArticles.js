const { Client } = require("pg");

module.exports = async () => {
  try {
    const database = new Client({
      user: "blogdb",
      host: "localhost",
      database: "blogdb",
      password: "blogdb123",
      port: 5432
    });

    await database.connect();
    const response = await database.query(`select * from articles;`);
    await database.end();

    return response.rows.length;
  } catch (error) {
    console.error(error);
  }
};
