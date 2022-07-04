<template>
	<div id="card">
		<header>
			<img class="avatar" v-bind:src="userInfo.userFace" v-bind:alt="userInfo.name">
			<p class="name">{{userInfo.name}}</p>
		</header>
		<footer>
			<input class="search" type="text" v-model="$store.state.filterKey" placeholder="search user...">
		</footer>
	</div>
</template>

<script>
	export default {
		name: 'Card',
		data () {
			return {
				userInfo: JSON.parse(window.sessionStorage.getItem('userInfo'))
			}
		}
	}
</script>

<style lang="scss" scoped>
	#card {
		padding: 12px;

		.avatar{
			width: 40px;
			height: 40px;
			float: left;
			line-height: 0;
			margin-right: 20px;
		}

		.name {
			padding: 10px;
			font-size: 16px;
			line-height: 20px;
		}

		.search {
			background: #26292E;
			height: 30px;
			line-height: 30px;
			padding: 0 5px;
			border: 1px solid #3a3a3a;
			border-radius: 4px;
			outline: none; /*鼠标点击后不会出现蓝色边框*/
			color: #FFF;
		}
	}
</style>
