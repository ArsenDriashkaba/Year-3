import express from "express";
import { getScoreTable, setUserScore } from "./db";

const router = express.Router();

// Get default board information
router.get("/boardInfo", (_, res) => {
  try {
    const boardInfo = {
      rows: 3,
      columns: 4,
      card: {
        width: 80,
        height: 120,
      },
      points: 5,
      seconds: 60,
    };

    res.status(200).send(boardInfo);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Get all scores sorted
router.get("/scores", async (_, res) => {
  try {
    const data = await getScoreTable();

    const arrOfData = Object.keys(data).map((key) => {
      return { name: key, score: data[key].score };
    });
    const sortedData = arrOfData.sort((first, second) => {
      if (first.score < second.score) {
        return 1;
      }
      if (first.score > second.score) {
        return -1;
      }

      return 0;
    });

    res.status(200).send(sortedData);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Set score to user name
router.post("/scores/:name", async (req, res) => {
  try {
    const name = req?.params?.name;
    const score = req?.body?.score;

    if (!name || !score) {
      res.status(400).send("Bad request :)");
      return;
    }

    await setUserScore(name, score);

    res.status(200).send({ name, score });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

export default router;
