import { config } from "dotenv";
import app from "./app";

config();

const port = process.env.PORT || 6005;

app.get("/", (req, res) => {
  return res.send("Hi");
});

app.listen(port, () => {
  console.log(`Server is init at http://localhost:${port}`);
});
