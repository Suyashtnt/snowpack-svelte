module.exports = {
  mount: {
    public: "/",
    src: "/_dist_",
  },
  devOptions: {
    output: "stream",
    open: "none",
  },
  plugins: [
    "@snowpack/plugin-svelte",
    "snowpack-plugin-relative-css-urls",
    "@snowpack/plugin-dotenv",
    [
      "@snowpack/plugin-run-script",
      {
        cmd: "svelte-check --output human",
        watch: "$1 --watch",
        output: "stream",
      },
    ],
    [
      "snowpack-plugin-rollup-bundle",
      {
        // equivalent to inputOptions.input from Rollup
        entrypoints: "build/_dist_/index.js",

        extendConfig: (config) => {
          // https://rollupjs.org/guide/en/#outputoptions-object
          config.outputOptions = {
            // Prefer rollup output goes to a ./dist folder instead of re-writing ./build
            dir: "dist",
          };

          // https://rollupjs.org/guide/en/#inputoptions-object
          // config.inputOptions = {};

          return config;
        },
      },
    ],
  ],
};
