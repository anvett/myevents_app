// import fs from "fs";
// import path from "path";

// export function getGuestsData(type, slug) {
//   try {
//     const filePath = path.join(
//       process.cwd(),
//       "src",
//       "data",
//       "events",
//       type,
//       slug,
//       "guestsData.json"
//     );

//     console.log("Looking for guests at:", filePath);


//     const fileContents = fs.readFileSync(filePath, "utf8");
//     return JSON.parse(fileContents);
//   } catch (error) {
//     return [];
//   }
// }

// export function getGuestById(guests, guestId) {
//   return guests.find((guest) => guest.id === guestId) || null;
// }

// import fs from "fs";
// import path from "path";

// export function getGuestsData(type, slug) {
//   try {
//     const filePath = path.join(
//       process.cwd(),
//       "src",
//       "data",
//       "events",
//       type,
//       slug,
//       "guestsData.json"
//     );

//     console.log("Looking for guests at:", filePath);

//     const fileContents = fs.readFileSync(filePath, "utf8");

//     console.log("guestsData raw:", fileContents);

//     const parsedGuests = JSON.parse(fileContents);

//     console.log("parsedGuests:", parsedGuests);

//     return parsedGuests;
//   } catch (error) {
//     console.log("ERROR leyendo guestsData:", error);
//     return [];
//   }
// }

// export function getGuestById(guests, guestId) {
//   return guests.find((guest) => guest.id === guestId) || null;
// }

import fs from "fs";
import path from "path";

export function getGuestsData(type, slug) {
  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      "events",
      type,
      slug,
      "guestsData.json"
    );

    console.log("Looking for guests at:", filePath);

    const fileContents = fs.readFileSync(filePath, "utf8");

    console.log("guestsData raw:", fileContents);

    const parsedGuests = JSON.parse(fileContents);

    console.log("parsedGuests:", parsedGuests);

    return parsedGuests;
  } catch (error) {
    console.log("ERROR leyendo guestsData:", error);
    return [];
  }
}

export function getGuestById(guests, guestId) {
  return guests.find((guest) => guest.id === guestId) || null;
}