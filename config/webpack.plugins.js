const webpack = require("webpack");
const cssnano = require("cssnano");
const glob = require("glob");
const path = require("path");
const fs = require("fs");

const WebpackBar = require("webpackbar");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
// const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
// const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const config = require("./site.config");

// Hot module replacement
// const hmr = new webpack.HotModuleReplacementPlugin();

// Optimize CSS assets
const optimizeCss = new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: cssnano,
    cssProcessorPluginOptions: {
        preset: [
            "default",
            {
                discardComments: {
                    removeAll: true,
                },
            },
        ],
    },
    canPrint: true,
});

// Clean webpack
const clean = new CleanWebpackPlugin();

// Copy assets
// const copy = new CopyWebpackPlugin({
//     patterns: [
//         {
//             from: "images",
//             to: "images",
//             globOptions: {
//                 ignore: ["**/favicon.*"],
//             },
//         },
//         { from: "../sitemap.xml", to: "sitemap.xml" },
//     ],
// });

// Stylelint
const stylelint = new StyleLintPlugin();

// Extract CSS
const cssExtract = new MiniCssExtractPlugin({
    filename:
        config.env === "production"
            ? "assets/css/style.[contenthash].css"
            : "bundle.css",
});

// HTML generation
const paths = [];
const generateHTMLPlugins = () =>
    glob.sync("./src/index.html").map((dir) => {
        const filename = path.basename(dir);

        if (filename !== "404.html") {
            paths.push(filename);
        }

        return new HTMLWebpackPlugin({
            // alwaysWriteToDisk: true,
            filename,
            template: path.join(config.root, config.paths.src, filename),
            meta: {
                viewport: config.viewport,
            },
        });
    });

// // Favicons
// const favicons = new FaviconsWebpackPlugin({
//     logo: config.favicon,
//     prefix: "images/favicons/",
//     favicons: {
//         appName: config.site_name,
//         appDescription: config.site_description,
//         developerName: null,
//         developerURL: null,
//         manifestRelativePaths: true,
//         icons: {
//             android: true,
//             appleIcon: true,
//             appleStartup: false,
//             coast: false,
//             favicons: true,
//             firefox: false,
//             windows: false,
//             yandex: false,
//         },
//     },
// });

// Webpack bar
const webpackBar = new WebpackBar({
    color: "#5F48FF",
});

// Google analytics
// eslint-disable-next-line quotes
const CODE = `<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create','{{ID}}','auto');ga('send','pageview');</script>`;

// class GoogleAnalyticsPlugin {
//     constructor({ id }) {
//         this.id = id;
//     }

//     apply(compiler) {
//         compiler.hooks.compilation.tap(
//             "GoogleAnalyticsPlugin",
//             (compilation) => {
//                 HTMLWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
//                     "GoogleAnalyticsPlugin",
//                     (data, cb) => {
//                         // eslint-disable-next-line no-param-reassign
//                         data.html = data.html.replace(
//                             "</head>",
//                             `${CODE.replace("{{ID}}", this.id)}</head>`
//                         );
//                         cb(null, data);
//                     }
//                 );
//             }
//         );
//     }
// }

// const google = new GoogleAnalyticsPlugin({
//     id: config.googleAnalyticsUA,
// });

module.exports = [
    clean,
    // config.env === "production" && copy,
    stylelint,
    cssExtract,
    ...generateHTMLPlugins(),
    // new HtmlWebpackHarddiskPlugin(),
    // fs.existsSync(config.favicon) && favicons,
    config.env === "production" && optimizeCss,
    // config.googleAnalyticsUA && google,
    webpackBar,
    new WebpackManifestPlugin({
        fileName: path.join(config.root, "data", "manifest.json"),
    }),
    // new VueLoaderPlugin()
    // config.env === "development" && hmr,
].filter(Boolean);
