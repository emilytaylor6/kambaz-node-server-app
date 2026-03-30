import PathParameters from "./PathParameters.js";
import QueryParameters from "./QueryParameters.js";
import WorkingWithArrays from "./WorkingWithArrays.js";
import WorkingWithObjects from "./WorkingWithObjects.js";

export default function Lab5(app) {
  app.get("/lab5/welcome", (req, res) => {
    res.send("Welcome to Lab 5");
  });
  // 5.2.2
  PathParameters(app);
  QueryParameters(app);
  // 5.2.3
  WorkingWithObjects(app);
  // 5.2.4
  WorkingWithArrays(app);
};
