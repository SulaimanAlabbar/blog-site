const validator = require("validator");

module.exports = async (req, res, dbPool) => {
  if (!validator.isJSON(JSON.stringify(req.body.articleContent))) {
    return res.status(200).json(false);
  }

  const client = await dbPool.connect();

  try {
    await client.query(
      `insert into articles (title, content, author_id) values ($1, $2, $3)`,
      [
        req.body.articleTitle,
        JSON.stringify(req.body.articleContent),
        req.body.authorId
      ]
    );
    return res.status(200).json(true);
  } catch (error) {
    console.error(error);
  } finally {
    await client.release();
  }
};
