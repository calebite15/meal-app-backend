const Recipemodel = require("../models/Recipe");
///fecth all data
const GetAllRecipe = async (req: any, res: any) => {
  try {
    const result = await Recipemodel.sort({ createdart: -1 }).populate();
    res.status(303).json(result);
  } catch (error) {
    res.status(303).json({
      message: " failed to fecth data",
    });
  }
};
//fecth single data
const GetSingleRecipe = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const result = await Recipemodel.findBy(id).populate("title");

    if (!result) {
      return res.status(406).json({
        message: `task${id}not found`,
      });
    } else {
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(303).json({
      message: "fecth failed",
    });
  }
};
//update data
const UpdateRecipe = async (req: any, res: any) => {
  const { id } = req.params;
  const { title, description, ingredients, instructions, cookingTime } =
    req.body;
  try {
    const result = await Recipemodel.findById(id);
    if (!result) {
      return res.status(406).json({
        message: `task${id}not found`,
      });
    } else {
      result.title = title || result.title;
      result.instructions = instructions || result.instructions;
      result.description = description || result.description;
      result.cookingTime = cookingTime || result.cookingTime;

      result.projectLink = ingredients || result.ingredients;

      await result.save();
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(303).json({
      message: " failed to update",
    });
  }
};
const DeleteRecipe = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const result = await Recipemodel.findByIdAndDelete(id);
    if (!result) {
      return res.status(406).json({
        message: `meal${id}not found`,
      });
    } else {
      res.status(201).json({ message: `meal ${id} deleted successfully` });
    }
  } catch (error) {
    res.status(303).json({
      message: "internal server error",
    });
  }
};
///post data
const createRecipe = async (req: any, res: any) => {
  const { title, ingredients, instructions, cookingTime, description } =
    req.body;
  try {
    ///check is task exists in data base
    const projectExist = await Recipemodel.findOne({ title });
    if (projectExist) {
      res.status(405).json({
        message: "alredy created",
      });
    }

    ///to create new
    const createNewrecipe = await Recipemodel.create({
      title,
      description,
      ingredients,
      instructions,
      cookingTime,
    });
    ///saving ecerything is the reg.boby to the data base
    const taskResult = await createNewrecipe.save();

    ///where im returning the data if sucessfull
    res.status(200).json(taskResult);
    //or

    res.status(200).json({
      _id: taskResult._id,
      tittle: taskResult.title,
      ingredients: taskResult.ingredients,
      description: taskResult.description,
      cookingtime: taskResult.cookingTime.RecipeModel,

      intructions: taskResult.instructions,
    });
  } catch (error) {
    res.status(404).json({ message: "failed to fecth data" });
  }
};

module.exports = {
  GetAllRecipe,

  GetSingleRecipe,

  UpdateRecipe,

  DeleteRecipe,
  createRecipe,
};
