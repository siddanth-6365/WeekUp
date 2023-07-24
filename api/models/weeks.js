const mongoose = require("mongoose");
const { Schema } = mongoose;



const moduleSchema = new Schema({
    id: { type: String,  },
    name: { type: String,  },
    tasks: [
      {
        id: { type: String, }, // id is like tittle here
        name: { type: String }, 
      },
    ],
  });
  

const weekSchema = new Schema({
  id: { type: Number,  },
  week_number: { type: Number, required:true },
  modules: [moduleSchema],
});

const Week = mongoose.model("Week", weekSchema);

module.exports = Week;
