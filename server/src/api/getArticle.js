let db = require("../database/dbPool");

module.exports = async (req, res) => {
  const client = await db.pool.connect();
  try {
    //verify that id is an integer

    const response = await client.query(
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
  and articles.id = $1`,
      [req.params.id]
    );

    if (response.rows.length === 0) return false;

    return res.status(200).json(response.rows[0]);
  } catch (error) {
    console.error(error);
  } finally {
    await client.release();
  }
};
