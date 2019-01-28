const Joi = require("joi");

module.exports = async (req, res, dbPool) => {
  const schema = Joi.object().keys({
    articleId: Joi.number()
      .integer()
      .positive()
      .required(),
    comment: Joi.object().required()
  });

  const validBody = Joi.validate(req.body, schema);
  if (validBody.error !== null) return res.status(404).end();

  const client = await dbPool.connect();
  try {
    const response = await client.query(
      `select * from articles where id = $1`,
      [req.body.articleId]
    );

    if (response.rows.length === 0) return res.status(400).end();

    await client.query(
      `insert into comments (content, article_id, author_id) values ($1, $2, $3)`,
      [
        JSON.stringify(req.body.comment),
        req.body.articleId,
        Number(req.user.id)
      ]
    );

    return res.status(200).json(true);
  } catch (error) {
    console.error(error);
  } finally {
    await client.release();
  }
};
