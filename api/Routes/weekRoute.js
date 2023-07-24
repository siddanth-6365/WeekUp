const express = require("express");

const router = express.Router();
const { createWeek,getAllweeks,deleteById,AddModule,AddTask, DeleteTask, DeleteModule } = require("../controllers/weekController");

router.post("/", createWeek);

router.get("/", getAllweeks);

router.delete("/:id", deleteById);

router.patch("/addmodule", AddModule);

router.post("/addTask", AddTask);

router.post("/deleteTask", DeleteTask);

router.post("/:weekno/deleteModule", DeleteModule);











module.exports = router;
