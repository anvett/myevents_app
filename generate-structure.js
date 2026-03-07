const fs = require("fs");
const path = require("path");

const basePath = path.join(__dirname, "src", "app");

const structure = [
  {
    path: "",
    file: "page.js",
    content: `export default function Home() {
  return <div>Landing Principal</div>;
}
`,
  },
  {
    path: "wedding",
    file: "page.js",
    content: `export default function Wedding() {
  return <div>Wedding Landing</div>;
}
`,
  },
  {
    path: "wedding/[slug]",
    file: "page.js",
    content: `export default function WeddingSlug() {
  return <div>Wedding Event</div>;
}
`,
  },
  {
    path: "birthday",
    file: "page.js",
    content: `export default function Birthday() {
  return <div>Birthday Landing</div>;
}
`,
  },
  {
    path: "birthday/[slug]",
    file: "page.js",
    content: `export default function BirthdaySlug() {
  return <div>Birthday Event</div>;
}
`,
  },
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

console.log("Structure generation completed.");
