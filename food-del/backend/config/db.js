import mongoose from "mongoose";

export const connectDB = async()=>{
  await mongoose.connect('mongodb+srv://kartik_2005:kartik2005@cluster0.dzlg0cg.mongodb.net/food-del').then(()=>console.log("DB connected"));
}