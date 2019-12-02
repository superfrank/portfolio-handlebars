const fs = require("fs-extra");
const handlebars = require("handlebars");
var glob = require("glob"); // <<here

let data = fs.readFileSync("scripts/data.json", "utf8");
data = JSON.parse(data); // converts the data variable from a string into a Javascript object. Do a console.log(typeof FILENAME) to see
const source = fs.readFileSync("src/templates/index.html", "utf8");
const template = handlebars.compile(source);

handlebars.registerHelper("inc", index => index++);

// <<from here

// console.log(output);

let partials = glob.sync("src/templates/includes/*.*");
// console.log(partials);

partials.forEach(function(partial) {
  var name = partial.replace("src/templates/includes/", "").split(".")[0];
  var template = fs.readFileSync(partial, "utf8");

  handlebars.registerPartial(name, template);
});

const output = template(data);
console.log(output);
