import esbuild from "esbuild";
import builtins from "builtin-modules";

esbuild.build({
	entryPoints: ["src/plugin/main.ts"],
	bundle: true,
	external: [
		"obsidian",
		"electron",
		"@codemirror/autocomplete",
		"@codemirror/collab",
		"@codemirror/commands",
		"@codemirror/language",
		"@codemirror/lint",
		"@codemirror/search",
		"@codemirror/state",
		"@codemirror/view",
		"@lezer/common",
		"@lezer/highlight",
		"@lezer/lr",
		...builtins],
	format: "cjs",
	target: "es2018",
	logLevel: "info",
	sourcemap: true,
	treeShaking: true,
	outfile: "main.js",
	platform: "node",
	sourcemap: false,
	minify: false,
});
