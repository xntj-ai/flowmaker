// 把 examples/<name>.json 的数据注入 assets/template.html，产出 examples/<name>.html
// 用法: node scripts/build-example.cjs worldcup
const fs = require("fs");
const path = require("path");

const name = process.argv[2] || "worldcup";
const root = path.join(__dirname, "..");
const tpl = fs.readFileSync(path.join(root, "assets", "template.html"), "utf8");
const dataRaw = fs.readFileSync(path.join(root, "examples", name + ".json"), "utf8");
const data = JSON.parse(dataRaw);

const island = '<script id="flow-data" type="application/json">\n' + dataRaw.trim() + "\n</script>";
const out = tpl
  .replace(/<script id="flow-data" type="application\/json">[\s\S]*?<\/script>/, island)
  .replace(/__TITLE__/g, data.title || "flowmaker");

fs.writeFileSync(path.join(root, "examples", name + ".html"), out);
console.log("built examples/" + name + ".html");
