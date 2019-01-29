module.exports = async (req, res, dbPool) => {
  const client = await dbPool.connect();
  try {
    const response = await client.query(
      `select 
      articles.id as article_id,
      articles.title as article_title 
      from articles, pinned_articles  
      where pinned_articles.article_id = articles.id;`
    );

    if (response.rows.length === 0) return res.status(200).json(false);

    return res.status(200).json(response.rows);
  } catch (error) {
    console.error(error);
  } finally {
    await client.release();
  }
};
