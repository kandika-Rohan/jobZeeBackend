import app from "./app.js";
import cloudinary from "cloudinary";
import dotenv, { config } from "dotenv";

dotenv=config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});
const port =process.env.PORT || 5000;


app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
