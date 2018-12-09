const { Client } = require("pg");

module.exports = async userInfo => {
  const name = userInfo.name;
  const password = userInfo.password;
  const email = userInfo.email;

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
      `insert into users (name, password, email, role) values ('${name}', '${password}', '${email}', 'unverified');`
    );
    await database.end();

    console.log(response);
    return "abc";
  } catch (error) {
    console.error(error);
  }
};
