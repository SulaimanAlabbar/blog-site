const { Client } = require("pg");

module.exports = async articleInfo => {
  const title = articleInfo.title;
  const content = articleInfo.content;
  const tags = articleInfo.tags;
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
      `insert into articles (title, content, tags, author_id) values ('${title}', ${content}, ARRAY${tags}, ${authorId});`
    );
    await database.end();

    console.log(response);
    return "abc";
  } catch (error) {
    console.error(error);
  }
};
