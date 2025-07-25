/// <reference types="vite/client" />
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

import { globSync } from "glob";
import console from "node:console";

// Enumerate all HTML files in the app directory
const files = globSync("./app/**/*.html", {
    nodir: true,
    absolute: false,
    cwd: ".",
});

// Vite generates sites based on the structure of the folder containing this HTML file.
// Therefore, creating page folders under `src` may result in undesirable behaviour.
// Note: This behaviour applies only to HTML files, not when in library mode.
const entries = {} as Record<string, string>;

files.forEach((file) => {
    // Make path normalised
    const fileNormalised = file.replace(/\\/g, "/");
    const path = fileNormalised.replace("app/", "").replace(".html", "");
    entries[path] = fileNormalised;
});

const production = import.meta.env?.MODE !== "production";
// Show the entries and production mode for debugging purposes
console.log(`Entries: ${JSON.stringify(entries, null, 2)}`);
console.log(`Production mode: ${production}`);

export default defineConfig({
    resolve: {
        alias: {
            // For convenience, we use `@applib` as an alias for the applib directory.
            // The applib directory has been separated from the app directory to ensure that the app folder expresses the site structure clearly.
            "@applib": "applib",
        },
    },
    appType: "mpa",
    base: "",
    root: "app",
    build: {
        assetsDir: "internal",
        rollupOptions: {
            input: {
                main: "./app/index.html",
                ...entries,
            },
            output: {
                chunkFileNames: "internal/[name]-[hash].js",
                assetFileNames: "internal/[name]-[hash][extname]",
                dir: "./static_app",
            },
            treeshake: true,
        },
        cssCodeSplit: false,
        sourcemap: !production,
    },
    plugins: [
        svelte({
            emitCss: true,
            compilerOptions: {
                // Enable runes if needed
                // runes: true,
                // Enable custom elements if needed
                customElement: true,
            },
        }),
        nodeResolve({
            browser: true,
            dedupe: ["svelte"],
        }),
        //@ts-ignore : Type Issue with Deno
        commonjs({}),
        production
            //@ts-ignore : Type Issue with Deno
            ? terser()
            : null,
    ]
        .filter(Boolean),
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:8000",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
});
