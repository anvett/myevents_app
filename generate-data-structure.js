const fs = require("fs");
const path = require("path");

const basePath = path.join(__dirname, "src", "data");

const folders = [
  "templates",
  "templates/wedding",
  "templates/birthday",
  "events",
];

folders.forEach((folder) => {
  const folderPath = path.join(basePath, folder);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log("Created directory:", folderPath);
  } else {
    console.log("Directory already exists:", folderPath);
  }
});

console.log("Data structure created successfully.");
