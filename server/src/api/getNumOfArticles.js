module.exports = async (req, res, dbPool) => {
  const client = await dbPool.connect();
  try {
    const response = await client.query(`select * from articles;`);

    return res.status(200).json(response.rows.length);
  } catch (error) {
    console.error(error);
  } finally {
    await client.release();
  }
};
