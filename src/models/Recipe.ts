import mongoose, { Schema, Document } from "mongoose";

export interface IRecipe extends Document {
  title: string;
  description: string;
}

const RecipeSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model<IRecipe>("Recipe", RecipeSchema);
