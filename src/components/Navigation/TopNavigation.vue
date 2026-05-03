<template>
	<nav>
		<div></div>
		<div>
			<!-- 动态生成导航 -->
			<a v-for="router in themeConfig.Nav.router" :href="router.link">
				<i :class="'ri-' + router.icon"></i>
				{{ router.name }}</a
			>
		</div>
		<div></div>
	</nav>
</template>
<script lang="ts" setup>
import { themeConfig } from "@/src/libs/config";
</script>
<style lang="scss" scoped></style>
