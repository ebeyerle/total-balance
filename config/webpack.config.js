const path = require("path");

const config = require("./site.config");
const loaders = require("./webpack.loaders");
const plugins = require("./webpack.plugins");

console.log(path.join(process.cwd(), "./dist"));

module.exports = {
    context: path.join(config.root, config.paths.src),
    // resolve: {
    //     alias: {
    //         vue$:
    //             process.env.NODE_ENV === "production"
    //                 ? "vue/dist/vue.min.js"
    //                 : "vue/dist/vue.js" // 'vue/dist/vue.common.js' for webpack 1
    //     }
    // },
    entry: [
        path.join(config.root, config.paths.src, "js/index.js"),
        // path.join(config.root, config.paths.src, "css/style.scss"),
    ],
    output: {
        path: path.join(config.root, config.paths.dist),
        publicPath: "/",
        filename:
            config.env === "production"
                ? "assets/js/[name].[fullhash].js"
                : "bundle.js",
    },
    mode: ["production", "development"].includes(config.env)
        ? config.env
        : "development",
    // devtool:
    //     config.env === "production"
    //         ? "hidden-source-map"
    //         : "cheap-eval-source-map",
    devServer: {
        port: 1314,
    },
    module: {
        rules: loaders,
    },
    externals: {
        moment: "moment",
    },
    stats: "errors-only",
    plugins,
};
