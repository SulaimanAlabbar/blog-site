const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

module.exports = async (passport, dbPool) => {
  passport.use(
    new LocalStrategy(async (username, password, cb) => {
      const client = await dbPool.connect();
      try {
        const response = await client.query(
          `select * from users where name = $1`,
          [username]
        );

        if (response.rows.length === 0) return cb(null, false);

        const passwordCorrect = await bcrypt.compare(
          password,
          response.rows[0].password
        );

        if (!passwordCorrect) return cb(null, false);
        else return cb(null, response.rows[0]);
        // don't return password
      } catch (error) {
        console.error(error);
        return cb(error);
      } finally {
        await client.release();
      }
    })
  );

  passport.serializeUser((user, cb) => cb(null, user.id));

  passport.deserializeUser(async (id, cb) => {
    const client = await dbPool.connect();
    try {
      const response = await client.query(`select * from users where id = $1`, [
        id
      ]);

      if (response.rows.length !== 0) cb(null, response.rows[0]);
    } catch (error) {
      console.error(error);
      return cb(error);
    } finally {
      await client.release();
    }
  });
};
