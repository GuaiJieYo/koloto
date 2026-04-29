/**
 * 此文件用于规范yml的类型
 * This file is used to standardize the type of yml
 */

// ======Config======
interface Site {
	url: string;
	title: string;
	author: string;
	description: string;
	keywords: string[];
	favicon: string;
	avatar: string;
}

interface ThemeConfig {
	Site: Site;
}
// ======Config======

declare module "*_config.theme.yml" {
	const value: ThemeConfig;
	export default value;
}

declare module "*.yml" {
	const value: any;
	export default value;
}
