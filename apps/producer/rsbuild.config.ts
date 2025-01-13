import { defineConfig, type RsbuildPlugin } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { withZephyr } from "zephyr-rspack-plugin";

// const zephyrRsbuildPlugin = (): RsbuildPlugin => ({
//   name: "zephyr-rsbuild-plugin",
//   post: ["moduleFederationPlugin"],
//   setup: (api) => {
//     api.modifyRspackConfig(async (config, utils) => {
//       const zephyrConfig = await withZephyr()(config);
//       console.log("PRODUCER", config.plugins)
//       utils.mergeConfig(config, zephyrConfig);
//     });
//   }
// });

export default defineConfig({
  server: {
    port: 3001
  },
  plugins: [
    pluginReact({ splitChunks: { react: false, router: false } }),
    pluginModuleFederation({
      name: "producer",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.tsx"
      },
      shared: ["react", "react-dom"]
    })
    // zephyrRsbuildPlugin()
  ],
  tools: {
    rspack: async (config, utils) => {
      const zeConfig = await withZephyr()(config);
      const results = utils.mergeConfig(config, zeConfig);
      console.log("PRODUCER", results.plugins)
    }
  }
});
