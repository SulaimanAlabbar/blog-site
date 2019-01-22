module.exports = async (req, res, dbPool) => {
  const client = await dbPool.connect();
  try {
    const response = await client.query(
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
      [req.params.articleId, req.params.from]
    );

    console.log("FETCHING COMMENTS");

    if (response.rows.length === 0) return res.status(200).json(false);

    return res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
  } finally {
    await client.release();
  }
};
