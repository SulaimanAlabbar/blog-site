const { Client } = require("pg");

module.exports = async userInfo => {
  const userId = userInfo.userId;
  const password = userInfo.password;

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
      `update users set password = '${password}' where id = ${userId};`
    );
    await database.end();

    console.log(response);
    return "abc";
  } catch (error) {
    console.error(error);
  }
};
