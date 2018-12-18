const { Client } = require("pg");

module.exports = async articleInfo => {
  const title = articleInfo.title;
  const content = JSON.stringify(articleInfo.content);
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
    const response = await database.query(
      `insert into articles (title, content, author_id) values ('${title}', '${content}', ${authorId});`
    );
    await database.end();

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
