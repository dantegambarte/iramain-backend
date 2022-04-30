const express = require("express");
const router = express.Router();
const connection = require("./../config/db");

router.get("/", (req, res) => {
  res.send("Welcome to my API");
});

router.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send("Not results");
    }
  });
});

router.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM users where id = ${id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    if (result.length > 0) {
      res.json(result);
    } else {
      res.send("Not results");
    }
  });
});

router.post("/addUser", (req, res) => {
  const sql = "INSERT INTO users SET ?";
  const usersObj = {
    id: req.body.id,
    name: req.body.name,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  connection.query(sql, usersObj, (error) => {
    if (error) throw error;
    res.send("User created!");
  });
});

router.put("/updateUser/:id", (req, res) => {
  const { id } = req.params;
  const { name, lastname, username, email, password } = req.body;
  const sql = `UPDATE users SET name = '${name}', lastname = '${lastname}', username = '${username}', email = '${email}', password = '${password}' WHERE id = ${id}`;
  connection.query(sql, (error) => {
    if (error) throw error;
    res.send("User updated!");
  });
});

router.delete("/deleteUser/:id", (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM users WHERE id = ${id}`;

  connection.query(sql, (error) => {
    if (error) throw error;
    res.send("User deleted!");
  });
});

module.exports = router;
