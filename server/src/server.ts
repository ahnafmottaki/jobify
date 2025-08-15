import mongoose from "mongoose";
import app from "./app";

const port = process.env.PORT || 5000;
(async function () {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    app.listen(port, () => {
      console.log("server started listening at " + port);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
