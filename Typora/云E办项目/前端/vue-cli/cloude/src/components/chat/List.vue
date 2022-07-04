<template>
	<div id="list">
		<ul style="padding-left: 0px; margin-top: 0;">
			<li v-for="(item, index) in admins" 
				:key="index" 
				:class="{ active: currentSession ? item.username === currentSession.username : false }" 
				v-on:click="changeCurrentSession(item)">
				<el-badge class="dot" :is-dot="isDot[user.username + '#' + item.username]"></el-badge>
				<img class="avatar" :src="item.userFace" :alt="item.name">
				<p class="name">{{item.name}}</p>
			</li>
		</ul>
	</div>
</template>

<script>
import {mapState} from 'vuex'

export default {
	name: 'List',
	data () {
		return {
			user: JSON.parse(window.sessionStorage.getItem('userInfo'))
		}
	},
	computed:
		mapState([
			'isDot',
			'admins',
			'currentSession'
		]),
	methods:{
		changeCurrentSession: function(currentSession) {
			this.$store.commit('changeCurrentSession', currentSession)
		}
	}
}
</script>

<style lang="scss" scoped>
	#list {
		li {
			padding: 0px 15px;
			border-bottom: 1px solid #292C33;
			cursor: pointer;
			line-height: 20px;
			&:hover {
				background-color: rgba(255, 255, 255, 0.03);
			}
		}

		li.active {/*注意这个是.不是冒号:*/
				background-color: rgba(255, 255, 255, 0.1);
		}

		.avatar {
			float: left;
			border-radius: 2px;
			width: 30px;
			height: 30px;
			margin-top: 15px;
		}
		
		.name {
			display: inline-block;
			margin-left: 15px;
		}

		.dot {
			margin-bottom: 15px;
		}
	}
</style>
