const express = require("express");
const mongoose = require("mongoose");
const deploymentRouter = require("./src/routes/deploymentRoutes.ts");
const bodyParser = require("body-parser");
const path = require("path");

export const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
// const db = require('./config/keys').mongoURI;
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://eJam:xUIJPOrNm90RxBDv@cluster0.vyk2f.mongodb.net/deploymentsData?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err: Error) => console.log("Error connecting MongoDB", err));

// Use Routes
app.use("/api/", deploymentRouter);

// app.use(deploymentRouter);
app.use(express.static(__dirname + "/client/build"));

app.get("*", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server running on port ${port}`));
