import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
	// 导入md和mdx
	loader: glob({ pattern: "**/*.{md,mdx}", base: "post/" }),
	schema: ({ image }) =>
		z.object({
			title: z.string(), // 标题
			tags: z.array(z.string()).optional(), // 标签
			description: z.string().optional(), // 描述
			createDate: z.coerce.date(), // 创建时间
			updatedDate: z.coerce.date().optional(), // 更新时间
			heroImage: z.optional(image()).optional(), // 封面图片
		}),
});

export const collections = { blog };
