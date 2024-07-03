const path = require("path");
const fs = require("fs");
const fetch = require("isomorphic-fetch");

const downloadsDir = path.join(__dirname, "downloads");
if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir);
}

fetch("https://reddit.com/r/popular.json")
  .then((response) => response.json())
  .then((data) => {
    data.data.children.forEach((article) => {
      const url = article.data.url;
      const ext = path.extname(url);

      if (ext === ".png" || ext === ".jpg" || ext === ".gif") {
        fetch(url)
          .then((res) => res.buffer())
          .then((buffer) => {
            fs.writeFileSync(
              path.join(downloadsDir, `${article.data.id}${ext}`),
              buffer,
              (err) => {
                if (err) {
                  console.error("Error writing file:", err);
                } else {
                  console.log(`File saved: ${article.data.id}${ext}`);
                }
              }
            );
          })
          .catch((err) => console.error("Error fetching image:", err));
      }
    });
  })
  .catch((err) => console.error("Error fetching data:", err));
