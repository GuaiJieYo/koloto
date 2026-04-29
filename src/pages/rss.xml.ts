import { getCollection } from "astro:content";
import rss, { type RSSOptions } from "@astrojs/rss";
import themeConfig from "@/_config.theme.yml";

export async function GET(context: RSSOptions) {
	const posts = await getCollection("blog");
	return rss({
		title: themeConfig.Site.title,
		description: themeConfig.Site.description,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/${post.id}/`,
		})),
	});
}
