import { config } from "dotenv";
import app from "./app";

config();

app.get("/", (req, res) => {
  res.send("hi");
});

const port = process.env.PORT || 6005;

app.listen(port, () => {
  console.log(`Server is init at http://localhost:${port}`);
});
