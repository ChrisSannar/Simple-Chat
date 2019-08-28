<template>
	<div class="wrap">
		<h1>{{username}}</h1>
		<ChatBody class="chatBody" :msg="text" @clearMsg="clearMessageToBody"/>
		<ChatInput class="chatInput" @submitMessage="addMessageToBody"/>
	</div>
</template>

<script>
import ChatInput from './ChatInput.vue';
import ChatBody from './ChatBody.vue';

export default {
	name: 'SimpleChat',
	props: ['name', 'socketId'],
	components: {
		ChatInput,
		ChatBody
	},
	data () {
		return {
			text: "",
			username: this.name,
			// socketId: this.socketId,
			displayMain: false,
			connected: false
		}
	},
	created() {

		// this.adjustEditorWindow();
		// window.onresize = this.adjustEditorWindow;

	},
	watch: {

		// Watch for the username change
		name: function (val) {
			this.username = val;
		},
		socketId: function(val) {
			this.socketId = val;
		}
	},
	methods: {

		// Adjusts the windows size everytime it opens up
		adjustEditorWindow: function() {
			// windowHeight = window.innerHeight;
			// inputHeight = document.querySelector()
			// document.querySelector(".messages").style.height = (window.innerHeight - 18) + "px";
		},
		addMessageToBody(event) {
			this.text = event;
		},
		clearMessageToBody() {
			this.text = "";
		}
	},
	sockets: {
		temp(msg) {
			console.log(msg);
		}
	}
}
</script>

<style>

.wrap {
	margin-top: 3em;
	display: flex;
	flex-direction: column;
	width: 50%;
	margin: auto;
	height: 100vh;
}

.chatBody {
	height: 85vh;
}

.chatInput {
	height: 15vh;
}

.main {
	/* display: flex;
	justify-content: center;
	align-items: center;
	background: blue;
	padding-top: 20%;
	height: 100%; */
}

.chat {
	/* display: flex;
	flex-direction: column;
	align-items: flex-end;
	height: 100%; */
}
</style>