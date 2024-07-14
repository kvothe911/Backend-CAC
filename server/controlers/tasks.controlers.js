import { connection } from "../db.js";

export const getTasks = async (req, res) => {
  try {
    const [result] = await connection
      .promise()
      .query("SELECT * FROM tasks ORDER BY createAt ASC");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    console.log(req.params.id);
    const [result] = await connection
      .promise()
      .query("SELECT * FROM tasks WHERE id = ?", [req.params.id]);

    if (result.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const [result] = await connection
      .promise()
      .query("INSERT INTO tasks (title, description) VALUES (?, ?)", [
        title,
        description,
      ]);
    console.log("Data inserted, ID:", result.insertId);
    res.json({
      ID: result.insertId,
      title,
      description,
    });
  } catch (error) {
    console.error("Error inserting data: " + error.message);
    res.status(500).send("Error creating task");
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const result = await connection
      .promise()
      .query("UPDATE tasks SET ? WHERE id = ?", [req.body, req.params.id]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const [result] = await connection
      .promise()
      .query("DELETE FROM tasks WHERE id = ?", [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
