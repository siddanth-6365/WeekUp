const Week = require("../models/weeks");

async function createWeek(req, res) {
  try {
    const data = req.body;
    const order = String(data.order);
    const weekNo = data.week_number; // this is before or after week number
    //   const newWeekNo = data.week_number; // this is new week number  , i think no need it will automatically update the weeknos

    async function insertdata(weeknum, req) {
      await Week.create({
        id: req.body.id,
        week_number: weeknum,
      })
        .then((result) => {
          console.log("Data inserted successfully.");
        })
        .catch((error) => {
          console.error("Error occurred:", error);
        });
    }

    if (order === "before") {
      await Week.updateMany(
        { week_number: { $gte: weekNo } },
        { $inc: { week_number: 1 } },
        { multi: true }
      )
        .then((result) => {
          console.log(`${result.nModified} documents updated successfully.`);
        })
        .catch((error) => {
          console.error("Error occurred:", error);
        });

      await insertdata(weekNo, req);

      res.json({
        message: `data inserted succesfully after the ${weekNo}`,
      });
    }

    if (order === "after") {
      await Week.updateMany(
        { week_number: { $gte: weekNo + 1 } },
        { $inc: { week_number: 1 } },
        { multi: true }
      )
        .then((result) => {
          console.log(`${result.nModified} documents updated successfully.`);
        })
        .catch((error) => {
          console.error("Error occurred:", error);
        });

      await insertdata(Number(weekNo) + 1, req);

      res.json({
        message: `data inserted succesfully after the ${weekNo}`,
      });
    }

    // if (order == "undefined") {
    //   // normal create week not for before or after
    //   await insertdata(weekNo, req);
    //   res.json({
    //     message: "data inserted succesfully",
    //   });
    // }
  } catch (error) {
    console.log("error in create week controller ", error);
  }
}

async function getAllweeks(req, res) {
  try {
    const data = await Week.find({}).sort({ week_number: 1 }); // for getting in ascending order and -1 for descending order
    res.json({
      data: data,
    });
  } catch (err) {
    console.log("error in getAll weeks", err);
  }
}

async function deleteById(req, res) {
  try {
    const id = req.body.params;
    const data = await Week.deleteOne({ id: id });
    res.json({
      message: "data deleted of given id",
    });
  } catch (err) {
    console.log("error in deleteById", err);
  }
}

async function AddModule(req, res) {
  try {
    const newModule = [...req.body.moduleWeek.modules, req.body.newModule];
    console.log("newModule :", newModule);

    const resp = await Week.findOneAndUpdate(
      { week_number: req.body.moduleWeek.week_number },
      { modules: newModule }
    );

    res.json({
      message: "added new module",
      data: resp,
    });
  } catch (err) {
    console.log("error in add module controller", err);
  }
}

async function AddTask(req, res) {
  try {
    console.log("req :", req.body);
    const newTasks = [...req.body.Currentmod.tasks, req.body.newtask];
    const cweek = await Week.find({
      week_number: req.body.moduleWeek.week_number,
    });

    // Loop through the cweek array to find the correct module
    for (const week of cweek) {
      const cmodule = week.modules.find(
        (module) => module.id === req.body.Currentmod.id
      );

      if (cmodule) {
        // Add the new task to the tasks array of the found module
        cmodule.tasks.push(req.body.newtask);
        break; // Stop searching
      }
    }

    // Save the changes to the database
    await Promise.all(cweek.map((week) => week.save()));

    res.json({
      message: "added new task",
      data: cweek,
    });
  } catch (err) {
    console.log("error in Add task :", err);
  }
}

async function DeleteTask(req, res) {
  try {
    const cweek = await Week.find({
      week_number: req.body.moduleWeek.week_number,
    });

    for (const week of cweek) {
      const cmodule = week.modules.find(
        (module) => module.id === req.body.Currentmod.id
      );

      if (cmodule) {
        const taskIdToDelete = req.body.task.id;
        // Use pull operator to remove the task from cmodule.modules.tasks
        await Week.updateOne(
          { _id: week._id, "modules.id": cmodule.id },
          { $pull: { "modules.$.tasks": { id: taskIdToDelete } } }
        );
        break;
      }
    }
    return res.json({
      message: "successfull deleted",
    });
  } catch (err) {
    return res.json({
      message: "error in delete by id",
      error: err,
    });
  }
}

async function DeleteModule(req, res) {
  try {
    const weekno = req.params.weekno;
   
    const cweek = await Week.findOne({
      week_number: weekno,
    });

    // Find the index of the module to delete based on activeModuleId
    const moduleIndex = cweek.modules.findIndex((module) => module.id === req.body.activeModuleId);
    console.log("module index :",moduleIndex) // this will be 0,1,2,3 means the index from array

    // If the module with the given activeModuleId is found, remove it from the modules array
    if (moduleIndex !== -1) {
      const deletedModule = cweek.modules.splice(moduleIndex, 1);
      await cweek.save(); 
      return res.json({
        message: "Successfully deleted module",
        module: deletedModule,
      });
    } else {
      return res.status(404).json({
        message: "Module not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error in delete module",
      error: err,
    });
  }
}

module.exports = {
  createWeek,
  getAllweeks,
  deleteById,
  AddModule,
  AddTask,
  DeleteTask,
  DeleteModule,
};
