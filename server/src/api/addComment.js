const validator = require("validator");

module.exports = async (req, res, dbPool) => {
  if (!validator.isJSON(JSON.stringify(req.body.comment))) {
    return res.status(200).json(false);
  }

  const client = await dbPool.connect();

  try {
    await client.query(
      `insert into comments (content, article_id, author_id) values ($1, $2, $3)`,
      [JSON.stringify(req.body.comment), req.body.articleId, req.body.authorId]
    );

    return res.status(200).json(true);
  } catch (error) {
    console.error(error);
  } finally {
    await client.release();
  }
};
