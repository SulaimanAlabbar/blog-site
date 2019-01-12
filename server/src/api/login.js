const bcrypt = require("bcryptjs");

module.exports = async (req, res, dbPool) => {
  const client = await dbPool.connect();
  try {
    const response = await client.query(`select * from users where name = $1`, [
      req.body.username
    ]);

    if (response.rows.length === 0) return res.status(200).json(false);

    const passwordCorrect = await bcrypt.compare(
      req.body.password,
      response.rows[0].password
    );

    if (!passwordCorrect) return res.status(200).json(false);
    else return res.status(200).json(response.rows[0]);
  } catch (error) {
    console.error(error);
  } finally {
    await client.release();
  }
};
