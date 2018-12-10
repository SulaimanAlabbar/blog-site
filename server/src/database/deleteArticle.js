const { Client } = require("pg");

module.exports = async articleInfo => {
  const articleId = articleInfo.id;

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
      `delete from articles where id = ${articleId};`
    );
    await database.end();

    console.log(response);
    return "abc";
  } catch (error) {
    console.error(error);
  }
};
