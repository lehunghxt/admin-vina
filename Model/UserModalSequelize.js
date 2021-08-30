// const { Sequelize, Model, DataTypes } = require("sequelize-v5");
// const sequelize = new Sequelize("EISV2", "sa", "SqlAsap@123", {
//   host: "10.0.0.51",
//   dialect: "mssql",
// });
// const tblUser_model = require("../ModelDefine/UserModalDefine")(sequelize);
// try {
//   await sequelize.authenticate();
//   console.log("Connection has been established successfully.");
//   // Find all users
//   const users = await tblUser_model.findOne({
//     where: {
//       UserName: "hungadmin",
//     },
//   });
//   console.log(users instanceof tblUser_model); // true
//   console.log("All users:", JSON.stringify(users, null, 2));
// } catch (error) {
//   console.error("Unable to connect to the database:", error);
// }
