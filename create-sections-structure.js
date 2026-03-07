const fs = require("fs");
const path = require("path");

const basePath = path.join(process.cwd(),"src", "components", "sections");

const sections = [
  "TopBar",
  "Hero",
  "Welcome",
  "Countdown",
  "Ceremony",
  "Reception",
  "Timeline",
  "DressCode",
  "ImportantInfo",
  "Lodging",
  "Transport",
  "Gifts",
  "Gallery",
  "Story",
  "Playlist",
  "Memories",
  "FinalCTA",
  "Footer"
];

function createStructure() {
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true });
    console.log("Created sections base directory.");
  }

  sections.forEach((section) => {
    const folderPath = path.join(basePath, section);
    const filePath = path.join(folderPath, `${section}.jsx`);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`Created folder: ${section}`);
    }

    if (!fs.existsSync(filePath)) {
      const componentContent = `export default function ${section}() {
  return (
    <div className="w-full py-12 px-6 border-b border-gray-200 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          ${section} Section
        </h2>
        <p className="text-gray-600">
          This is the ${section} component placeholder.
        </p>
      </div>
    </div>
  );
}
`;

      fs.writeFileSync(filePath, componentContent, "utf8");
      console.log(`Created file: ${section}.jsx`);
    } else {
      console.log(`Skipped existing file: ${section}.jsx`);
    }
  });

  console.log("Sections structure creation completed.");
}

createStructure();