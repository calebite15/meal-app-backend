const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const Recipeschema = mongoose.Schema(
  {
    //     sample: {
    //  type: String,
    //  require:[true,"can't be empty"],
    //  unique:true,
    //  default:"bite"
    // }

    title: {
      type: String,
      require: true,
    },

    description: {
      type: String,
      require: true,
    },

    ingredients: {
      type: String,
      require: true,
    },
    instructions: {
      type: String,
      require: true,
    },
    cookingTime: {
      type: String,
      require: true,
    },
    // mealIMG: [""],
  },
  {
    timestamp: true,
  }
);
module.exports = mongoose.model("Recipe", Recipeschema);
