import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
// import { process } from 'node:process'
const production = import.meta.env?.MODE !== "production";

import { globSync } from "glob";
const entries = {};
const files = globSync("applib/components/*.svelte");
for (const file of files) {
    const pathUnified = file.replace(/\\/g, "/"); // Normalize path for Windows
    const name = pathUnified
        .replace("applib/components/", "")
        .replace(".svelte", "")
        .toLowerCase();
    entries[name] = pathUnified;
}

export default defineConfig({
    base: "",
    build: {
        cssCodeSplit: false,
        lib: {
            formats: ["es"],
            entry: { ...entries, components: "applib/util/components.ts" },
        },
        sourcemap: !production,
        rollupOptions: {
            output: {
                chunkFileNames: "internal/[name]-[hash].js",
            },
            treeshake: true,
        },
        outDir: "./webcomponents",
    },
    plugins: [
        svelte({
            emitCss: !production,
            compilerOptions: {
                // runes: true,
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
});
