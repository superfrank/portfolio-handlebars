const fs = require("fs-extra");
const handlebars = require("handlebars");
var glob = require("glob");

let data = fs.readFileSync("scripts/data.json", "utf8");
data = JSON.parse(data); // converts the data variable from a string into a Javascript object. Do a console.log(typeof FILENAME) to see
const source = fs.readFileSync("src/templates/index.html", "utf8");
const initialTemplate = handlebars.compile(source);

handlebars.registerHelper("inc", index => index++);

let partials = glob.sync("src/templates/includes/*.*");

partials.forEach(function(partial) {
  const name = partial.replace("src/templates/includes/", "").split(".")[0];
  const template = fs.readFileSync(partial, "utf8");

  handlebars.registerPartial(name, template);
});

const output = initialTemplate(data);

// So this builds an index file, but then I wasn't sure how to loop over, internet etc.
// fs.outputFileSync(`build/index.html`, output);

// Tried this
// const compiledTemplate = fs.outputFileSync(`build/${partial()}.html`, output);
// console.log(compiledTemplate);

// && Tried this
// let projectTemplates = glob.sync("src/templates/projects/*.*");

// projectTemplates.forEach(function(project) {
//   const name = project.replace("src/templates/projects/", "").split(".")[0];
//   const template = fs.readFileSync(project, "utf8");
// });
// console.log(projectTemplates);
