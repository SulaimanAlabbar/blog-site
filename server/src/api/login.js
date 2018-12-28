let db = require("../database/dbPool");

module.exports = async (req, res) => {
  const client = await db.pool.connect();
  try {
    //validate username and password

    const response = await client.query(
      `select * from users where name = $1 and password = $2`,
      [req.body.username, req.body.password]
    );

    if (response.rows.length === 0) return res.status(200).json(false);
    else return res.status(200).json(response.rows[0]);
  } catch (error) {
    console.error(error);
  } finally {
    await client.release();
  }
};
