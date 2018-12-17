const { Client } = require("pg");

module.exports = async from => {
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
  order by articles.created
  limit 5 offset ${from};`
    );
    await database.end();

    if (response.rows.length === 0) return false;

    return response.rows;
  } catch (error) {
    console.error(error);
  }
};
