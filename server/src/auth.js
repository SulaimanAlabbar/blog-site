const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

module.exports = async (passport, dbPool) => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const client = await dbPool.connect();
      try {
        const response = await client.query(
          `select * from users where name = $1`,
          [username]
        );

        if (response.rows.length === 0) return done(null, false);

        const passwordCorrect = await bcrypt.compare(
          password,
          response.rows[0].password
        );

        if (!passwordCorrect) return done(null, false);
        else return done(null, response.rows[0]);
      } catch (error) {
        console.error(error);
        return done(error);
      } finally {
        await client.release();
      }
    })
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    const client = await dbPool.connect();
    try {
      const response = await client.query(`select * from users where id = $1`, [
        id
      ]);

      if (response.rows.length !== 0) done(null, response.rows[0]);
    } catch (error) {
      console.error(error);
      return done(error);
    } finally {
      await client.release();
    }
  });
};
