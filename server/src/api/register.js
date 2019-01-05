module.exports = async (req, res, dbPool) => {
  const client = await dbPool.connect();
  try {
    // validate username and password

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
      const response = await client.query(
        `insert into users (email, name, password) values ($1, $2, $3)`,
        [req.body.email, req.body.username, req.body.password]
      );

      return res.status(200).json(true);
    } else return res.status(200).json(taken);
  } catch (error) {
    console.error(error);
  } finally {
    await client.release();
  }
};
