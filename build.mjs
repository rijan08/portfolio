import { readFile, writeFile } from "node:fs/promises";
import { execSync } from "node:child_process";

execSync("tailwindcss -i ./css/input.css -o ./css/styles.css --minify", {
  stdio: "inherit",
});

const css = (await readFile("./css/styles.css", "utf8")).trim();
const html = await readFile("./index.html", "utf8");

const marker = {
  start: "<!-- styles:start -->",
  end: "<!-- styles:end -->",
};

const block = `${marker.start}\n    <style>${css}</style>\n    ${marker.end}`;
const region = new RegExp(`${marker.start}[\\s\\S]*?${marker.end}`);

if (!region.test(html)) {
  throw new Error(
    `Could not find inline-style markers in index.html. Expected ${marker.start} ... ${marker.end} inside <head>.`,
  );
}

await writeFile("./index.html", html.replace(region, block));
console.log("✓ inlined css/styles.css into index.html");
