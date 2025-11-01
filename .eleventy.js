import path from "node:path";
import * as sass from "sass";

export default function (config) {
  // add SCSS template format
  config.addTemplateFormats("scss");

  config.addPassthroughCopy("./src/main.js");

  // Set directories to pass through to the dist folder
  config.addPassthroughCopy("./src/assets");

  // Configure SCSS files
  config.addExtension("scss", {
    outputFileExtension: "css",

    // opt-out of Eleventy Layouts
    useLayouts: false,

    compile: async function (inputContent, inputPath) {
      let parsed = path.parse(inputPath);
      // Don’t compile file names that start with an underscore
      if (parsed.name.startsWith("_")) {
        return;
      }

      let result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || ".", this.config.dir.includes],
      });

      // Map dependencies for incremental builds
      this.addDependencies(inputPath, result.loadedUrls);

      return async (data) => {
        return result.css;
      };
    },
  });

  config.addWatchTarget("./src/scss/");

  return {
    pathPrefix:
      process.env.NODE_ENV === "production"
        ? "/sunnyside-agency-landing-page/"
        : "/",
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
    },
  };
}
