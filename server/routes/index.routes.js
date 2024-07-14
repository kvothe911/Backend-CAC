import { Router } from "express";
import { connection } from "../db.js";

const router = Router();

router.get("/ping", (req, res) => {
  connection.query("SELECT 1 + 1 as result", (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Error executing query" });
      return;
    }
    console.log(results);
    res.json(results[0]);
  });
});

export default router;
