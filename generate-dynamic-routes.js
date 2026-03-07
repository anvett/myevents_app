const fs = require("fs");
const path = require("path");

const basePath = path.join(__dirname, "src", "app");

const structure = [
  {
    path: "[type]/[slug]",
    file: "page.js",
    content: `export default function EventPage() {
  return <div>Dynamic Event Page</div>;
}
`,
  }
];

structure.forEach((item) => {
  const dirPath = path.join(basePath, item.path);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log("Created directory:", dirPath);
  }

  const filePath = path.join(dirPath, item.file);

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, item.content);
    console.log("Created file:", filePath);
  } else {
    console.log("File already exists:", filePath);
  }
});

console.log("Dynamic route structure created.");
