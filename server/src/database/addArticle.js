const { Client } = require("pg");

module.exports = async articleInfo => {
  const title = articleInfo.title;
  const content = articleInfo.content;
  const authorId = articleInfo.authorId;

  try {
    const database = new Client({
      user: "blogdb",
      host: "localhost",
      database: "blogdb",
      password: "blogdb123",
      port: 5432
    });

    await database.connect();
    await database.query(
      `insert into articles (title, content, author_id) values ($1, $2, $3)`,
      [title, content, authorId]
    );
    await database.end();

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
