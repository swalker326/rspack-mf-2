import { defineConfig, type RsbuildPlugin } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { withZephyr } from "zephyr-rspack-plugin";
import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";

const zephyrRsbuildPlugin = (): RsbuildPlugin => ({
  name: "zephyr-rsbuild-plugin",
  post: ["RspackModuleFederationPlugin"],
  setup: (api) => {
    api.modifyRspackConfig(async (config, utils) => {
      //@ts-expect-error
      const zephyrConfig = await withZephyr()(config);
      //@ts-expect-error
      utils.mergeConfig(config, zephyrConfig);
    });
  }
});

export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [
    pluginReact({ splitChunks: { react: false, router: false } }),
    pluginModuleFederation({
          name: "consumer",
          remotes: {
            producer: "producer@http://localhost:3001/remoteEntry.js"
          },
          shared: ["react", "react-dom", "@rsbuild/core"]
        }),
    zephyrRsbuildPlugin()
  ]
});
