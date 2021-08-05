const path = require("path"),
    fs = require("fs");

let ROOT = process.env.PWD;

if (!ROOT) {
    ROOT = process.cwd();
}

const config = {
    // Google Analytics tracking ID (leave blank to disable)
    googleAnalyticsUA: "",

    // The viewport meta tag added to your HTML page's <head> tag
    viewport: "width=device-width,initial-scale=1",

    // Source file for favicon generation. 512x512px recommended.
    favicon: path.join(ROOT, "/src/images/favicon.png"),

    // Local development URL
    dev_host: "localhost",

    // Advanced configuration, edit with caution!
    env: process.env.NODE_ENV,
    root: ROOT,
    paths: {
        config: "config",
        src: "src",
        dist: "dist"
    },
    package: JSON.parse(
        fs.readFileSync(path.join(ROOT, "/package.json"), { encoding: "utf-8" })
    )
};

// const sprites = svgstore({ copyAttrs: true });
// const prefix = path.join(config.root, "static", "assets", "images");
//passsing directoryPath and callback function
// fs.readdir(
//     path.join(config.root, "src", "images", "icons"),
//     function (err, files) {
//         //handling error
//         if (err) {
//             return console.log("Unable to scan directory: " + err);
//         }

//         //loop all files using forEach
//         files.forEach(function (file) {
//             sprites.add(
//                 path.basename(file, ".svg"),
//                 fs.readFileSync(
//                     path.join(config.root, "src", "images", "icons", file),
//                     "utf8"
//                 )
//             );
//         });

//         fs.writeFileSync(
//             path.join(config.root, "static", "assets", "images", "sprites.svg"),
//             sprites.toString()
//         );
//     }
// );

module.exports = config;
