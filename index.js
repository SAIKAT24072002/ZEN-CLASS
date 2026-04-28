
import express from "express";
import zenRoutes from "./src/routes/zen.routes.js";
import { connectDB } from "./src/config/db.js";


const app = express();

app.use(express.json());

app.use("/api/zen", zenRoutes);
  
connectDB();
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });