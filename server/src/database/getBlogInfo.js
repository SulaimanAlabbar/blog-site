const { Client } = require("pg");

module.exports = async () => {
  try {
    const database = new Client({
      user: "blogdb",
      host: "localhost",
      database: "blogdb",
      password: "blogdb123",
      port: 5432
    });

    await database.connect();
    const response = await database.query(
      `select 
      users.name,
      users.avatar,
      blog_info.description,
      blog_info.banner_image,
      blog_info.banner_text
      from blog_info, users where blog_info.owner_id = users.id;`
    );
    await database.end();

    return response.rows[0];
  } catch (error) {
    console.error(error);
  }
};
