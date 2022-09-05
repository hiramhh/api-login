const { server } = require("./api");
const { dbConnection } = require("./api/db");
const { PORT } = require("./config");

dbConnection.authenticate().then(() => {
  server.listen(PORT, () => console.log(`Server is running at ${PORT} 🚀`));
});
