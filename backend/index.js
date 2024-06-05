const { app } = require("./app");
const { connectDB } = require("./database/database.connection");
const PORT = 4000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
