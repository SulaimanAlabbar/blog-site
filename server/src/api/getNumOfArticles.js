let db = require("../dbPool");

module.exports = async (req, res) => {
  const client = await db.pool.connect();
  try {
    const response = await client.query(`select * from articles;`);

    return res.status(200).json(response.rows.length);
  } catch (error) {
    console.error(error);
  } finally {
    await client.release();
  }
};
