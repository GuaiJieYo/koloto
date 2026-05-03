/**
 * 此文件用于规范yml的类型
 * This file is used to standardize the type of yml
 */

// ======Config======
// 站点信息配置
interface Site {
	url: string;
	title: string;
	author: string;
	description: string;
	keywords: string[];
	favicon: string;
	avatar: string;
}

// 导航栏配置
interface Nav {
	router: NavRouter[];
}

interface NavRouter {
	name: string;
	link: string;
	icon: string;
}

// 友链配置
interface Friends {
	random: boolean;
	title: string;
	description: string;
}

// 站点信息配置
interface ThemeConfig {
	Site: Site;
	Nav: Nav;
	Friends: Friends;
}
// ======Config======

// ======FriendsLists======
// 友链信息配置
interface FriendsLists {
	title: string;
	description: string;
	url: string;
	avatar: string;
}
// ======FriendsLists======

declare module "*_koloto.yml" {
	const value: ThemeConfig;
	export default value;
}

declare module "*friends.yml" {
	const value: FriendsLists[];
	export default value;
}
