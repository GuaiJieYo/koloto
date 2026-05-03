/**
 * ！！！！！
 * 如果你没有十足的把握能保证不会出错，请勿修改此文件！
 * If you are not sure whether you can guarantee it will not go wrong,
 * please DO NOT modify this file!
 * ！！！！！
 */
// @ts-check
import mdx from "@astrojs/mdx";
import vue from "@astrojs/vue";
import yaml from "@rollup/plugin-yaml";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import YAML from "yaml";
import configFile from "./config/_koloto.yml?raw";

const themeConfig = YAML.parse(configFile);

export default defineConfig({
	integrations: [
		mdx({
			gfm: true,
		}),
		vue(), // 集成Vue支持
	],
	markdown: {
		shikiConfig: {
			theme: "dracula", // TODO: 手动配置主题
		},
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeKatex],
	},
	vite: {
		plugins: [yaml()],
	},
	site: themeConfig.Site.url,
	build: {
		assets: "_koloto",
	},
});
