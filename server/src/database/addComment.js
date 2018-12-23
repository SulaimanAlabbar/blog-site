const { Client } = require("pg");

module.exports = async commentInfo => {
  const authorId = commentInfo.authorId;
  const articleId = commentInfo.articleId;
  const comment = commentInfo.comment;

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
      `insert into comments (content, article_id, author_id) values ('${comment}', ${articleId}, ${authorId});`
    );
    await database.end();

    return response;
  } catch (error) {
    console.error(error);
  }
};
