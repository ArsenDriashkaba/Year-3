import "dotenv/config";
import express from "express";
import routes from "./routes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", routes);

app.all("*", (_, res) => {
  res.status(404).send("Bad request :)");
});

app.listen(process.env.PORT || 3000);

console.log(`Server listening on port ${process.env.PORT}`);
