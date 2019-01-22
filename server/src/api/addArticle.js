const Joi = require("joi");

module.exports = async (req, res, dbPool) => {
  if (!(req.user.role === "owner" || req.user.role === "contributor")) {
    return res.status(401).end();
  }

  const schema = Joi.object().keys({
    articleTitle: Joi.string()
      .min(3)
      .max(120)
      .required(),
    articleContent: Joi.object().required()
  });

  const validBody = Joi.validate(req.body, schema);
  if (validBody.error !== null) return res.status(404).end();

  const client = await dbPool.connect();
  try {
    await client.query(
      `insert into articles (title, content, author_id) values ($1, $2, $3)`,
      [
        req.body.articleTitle,
        JSON.stringify(req.body.articleContent),
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
