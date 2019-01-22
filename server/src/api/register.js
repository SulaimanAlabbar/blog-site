const bcrypt = require("bcryptjs");
const Joi = require("joi");
const countries = require("../countries");

module.exports = async (req, res, dbPool) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    username: Joi.string()
      .min(3)
      .max(20)
      .required(),
    password: Joi.string()
      .min(6)
      .max(30)
      .regex(/[a-z]/)
      .regex(/[A-Z]/)
      .regex(/\d+/)
      .required(),
    dateOfBirth: Joi.date()
      .min("1-1-1920")
      .max(new Date(new Date().setFullYear(new Date().getFullYear() - 13)))
      .required(),
    country: Joi.any()
      .valid(countries)
      .required()
  });

  const validBody = Joi.validate(req.body, schema);
  if (validBody.error !== null) return res.status(404).end();

  const client = await dbPool.connect();
  try {
    let taken = { email: false, username: false };

    const emailTaken = await client.query(
      `select * from users where email = $1`,
      [req.body.email]
    );

    if (emailTaken.rows.length !== 0) {
      taken = {
        ...taken,
        email: true
      };
    }

    const usernameTaken = await client.query(
      `select * from users where name = $1`,
      [req.body.username]
    );
    if (usernameTaken.rows.length !== 0) {
      taken = {
        ...taken,
        username: true
      };
    }

    if (
      JSON.stringify(taken) ===
      JSON.stringify({ email: false, username: false })
    ) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      await client.query(
        `insert into users (email, name, password) values ($1, $2, $3)`,
        [req.body.email, req.body.username, hashedPassword]
      );

      return res.status(200).json(true);
    } else return res.status(200).json(taken);
  } catch (error) {
    console.error(error);
  } finally {
    await client.release();
  }
};
