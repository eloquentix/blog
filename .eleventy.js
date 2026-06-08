const { DateTime } = require("luxon");
const rssPlugin = require("@11ty/eleventy-plugin-rss");

const SITE_URL = "https://blog.eloquentix.com";

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(rssPlugin);

  // Pass design assets straight through
  eleventyConfig.addPassthroughCopy({ "src/public": "public" });
  eleventyConfig.addPassthroughCopy({ "src/style": "style" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/llms.txt": "llms.txt" });

  eleventyConfig.addGlobalData("siteUrl", SITE_URL);

  // Human-readable date for display
  eleventyConfig.addFilter("readableDate", (dateObj) =>
    DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("LLL d, yyyy")
  );
  // ISO date for <time> and schema.org
  eleventyConfig.addFilter("isoDate", (dateObj) =>
    DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd")
  );
  // Absolute URL helper
  eleventyConfig.addFilter("absUrl", (path) => new URL(path, SITE_URL).toString());

  // Posts collection, newest first
  eleventyConfig.addCollection("posts", (collection) =>
    collection.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date)
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    pathPrefix: "/",
  };
};
