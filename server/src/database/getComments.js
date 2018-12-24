const { Client } = require("pg");

module.exports = async commentsInfo => {
  const from = commentsInfo.from;
  const articleId = commentsInfo.articleId;

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
      `select distinct
    comments.id as comment_id,
    comments.content as comment_content,
    comments.created as comment_created,
    users.id as author_id,
    users.name as author_name,
    users.avatar as author_avatar
  
  from articles, comments, users
  where comments.article_id = $1
  and comments.author_id = users.id
  order by comments.created
  limit 20 offset $2`,
      [articleId, from]
    );
    await database.end();

    if (response.rows.length === 0) return false;

    return response.rows;
  } catch (error) {
    console.error(error);
  }
};
