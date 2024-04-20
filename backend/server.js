import { v2 } from "cloudinary";
import app from "./app.js";
import DBConnection from "./config/DBConnection.js";
const PORT = process.env.PORT;

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(PORT, async () => {
  await DBConnection();
  console.log(`Backend is running on http://localhost:${PORT}`);
});
