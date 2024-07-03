const path = require("path");
const fs = require("fs");

const dataPath = path.join(__dirname, "../chirps.json");

let chirps = [
  { author: "Simmon", body: "Let's play corners!" },
  { author: "Wilem", body: "You're a dreadful partner." },
  { author: "Simmon", body: "Oh, please. I can play well enough." },
  { author: "Wilem", body: "I'll play if Kvothe here joins.." },
  { author: "Kvothe", body: "I could play a round. Who will be our fourth?" },
];

fs.writeFileSync(dataPath, JSON.stringify(chirps, null, 2), (err) => {
  if (err) console.log(err);
});

fs.readFile(
  dataPath,
  {
    encoding: "UTF-8",
  },
  (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const chirpsArray = JSON.parse(data);
    chirpsArray.forEach((post) => {
      console.log(`${post.body} \n -${post.author} \n`);
    });
  }
);
