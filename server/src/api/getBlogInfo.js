module.exports = async (req, res, dbPool) => {
  const client = await dbPool.connect();
  try {
    const response = await client.query(
      `select
      users.name,
      users.avatar,
      blog_info.description,
      blog_info.banner_image,
      blog_info.banner_text
      from blog_info, users where blog_info.owner_id = users.id;`
    );

    return res.status(200).json(response.rows[0]);
  } catch (error) {
    console.error(error);
  } finally {
    await client.release();
  }
};
