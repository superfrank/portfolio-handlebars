const fs = require("fs-extra");
const handlebars = require("handlebars");
const glob = require("glob");
const configPath = "build/";

let data = fs.readFileSync("scripts/data.json", "utf8");
data = JSON.parse(data); // converts the data variable from a string into a Javascript object. Do a console.log(typeof FILENAME) to see
const sourceIndex = fs.readFileSync("src/templates/index.html", "utf8");
const sourceProject = fs.readFileSync(
  "src/templates/projects/internet.html",
  "utf8"
); // new
const indexTemplate = handlebars.compile(sourceIndex);
const projectTemplate = handlebars.compile(sourceProject); // new

handlebars.registerHelper("inc", index => index++);

let partials = glob.sync("src/templates/includes/*.*");

partials.forEach(function(partial) {
  const name = partial.replace("src/templates/includes/", "").split(".")[0];
  const template = fs.readFileSync(partial, "utf8");

  handlebars.registerPartial(name, template);
});

const indexOutput = indexTemplate(data);
const projectOutput = projectTemplate(data); // new

// So this builds an index file, but then I wasn't sure how to loop over, internet etc.
fs.outputFileSync(`${configPath}index.html`, indexOutput);
fs.outputFileSync(`${configPath}internet.html`, projectOutput); // new

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
