const path = require("path");
const fs = require("fs");
const fetch = require("isomorphic-fetch");

const dataPath = path.join(__dirname, "popular-articles.json");

fetch("https://reddit.com/r/programmingHumor.json")
  .then((response) => response.json())
  .then((data) => {
    const articles = data.data.children.map((item) => ({
      title: item.data.title,
      url: item.data.url,
      author: item.data.author,
    }));

    console.log(articles);

    fs.writeFileSync(dataPath, JSON.stringify(articles, null, 2), (err) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log("File written successfully");
      }
    });
  })
  .catch((err) => console.error("Error fetching data:", err));
