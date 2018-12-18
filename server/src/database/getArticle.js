const { Client } = require("pg");

module.exports = async id => {
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
      `select 
    articles.id as article_id,
    articles.title as article_title,
    articles.content as article_content,
    articles.created as article_created,
    articles.edited as article_edited,
    users.id as author_id,
    users.name as author_name,
    users.avatar as author_avatar
  
  from articles, users
  where articles.author_id = users.id
  and articles.id = ${id};`
    );
    await database.end();

    if (response.rows.length === 0) return false;

    return response.rows[0];
  } catch (error) {
    console.error(error);
  }
};
