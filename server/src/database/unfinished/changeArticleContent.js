const { Client } = require("pg");

module.exports = async articleInfo => {
  const articleId = articleInfo.articleId;
  const content = articleInfo.content;

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
      `update articles set content = '${content}' where id = ${articleId};`
    );
    await database.end();

    console.log(response);
    return "abc";
  } catch (error) {
    console.error(error);
  }
};
