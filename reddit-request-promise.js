const path = require("path");
const fs = require("fs");
const rp = require("request-promise");

const dataPath = path.join(__dirname, "popular-articles.json");

rp("https://reddit.com/r/popular.json", (err, res, body) => {
  if (err) console.log(err);
  let articles = [];
  JSON.parse(body).data.children.forEach(item => {
    articles.push({
      title: item.data.title,
      url: item.data.url,
      author: item.data.author
    });
  });
  console.log(articles);
  fs.writeFileSync(dataPath, JSON.stringify(articles));
});
