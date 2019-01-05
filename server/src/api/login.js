module.exports = async (req, res, dbPool) => {
  const client = await dbPool.connect();
  try {
    // validate username and password

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
