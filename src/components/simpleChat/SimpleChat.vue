<template>
	<div class="main">
		<div v-if="errorMessage.length == 0" class="wrap">
			<h1>{{username}}</h1>
			<ChatBody class="chatBody" :msg="msg" @clearMsg="clearMessageToBody"/>
			<ChatInput class="chatInput" @submitMessage="sendMessage"/>
		</div>
		<div class="errorContainer" v-if="errorMessage.length != 0">
			<p class="error">{{ errorMessage }}</p>
		</div>
	</div>
</template>

<script>
import ChatInput from './ChatInput.vue';
import ChatBody from './ChatBody.vue';

import SimpleChatMessage from '../../SimpleChatMessage.js';

export default {
	name: 'SimpleChat',
	props: ['name', 'foreignName', 'socketId', 'foreignSocketId'],
	components: {
		ChatInput,
		ChatBody
	},
	data () {
		return {
			msg: null,						// Chat body watches for this to change before it makes any choices
			username: this.name,	// Just incase they forget
			errorMessage: '',			// Just incase the program breaks
		}
	},
	watch: {

		// Watch for the foreign and local username and socketId change
		name: function (val) {
			this.username = val;
		},
		foreignName: function (val) {
			this.foreignName = val;
		},
		socketId: function(val) {
			this.socketId = val;
		},
		foreignSocketId: function(val) {
			this.foreignSocketId = val;
		}

	},
	methods: {

		// Adjusts the windows size everytime it opens up
		adjustEditorWindow: function() {
			// windowHeight = window.innerHeight;
			// inputHeight = document.querySelector()
			// document.querySelector('.messages').style.height = (window.innerHeight - 18) + 'px';
		},

		// Changes 'msg' and therefore trigering ChatBody to do it's work
		addMessageToBody(msg, local) {
			this.msg = { msg: msg, local: local };
		},

		clearMessageToBody() {
			this.msg = null;
		},

		// Sends a message to the server as well as adds it to the body
		sendMessage(text) {
			if (text) {
				let msg = new SimpleChatMessage(text, this.name);
				this.addMessageToBody(msg, true);		// add the message to the body after we know it was recieved
				this.$socket.emit('newMessage', msg.toString(), function() {
					console.log('SEND MESSAGE CALLBACK');
				});
			}
		},

		// Handles the message from the server
		recieveMessage(msg) {
			this.addMessageToBody(SimpleChatMessage.fromString(msg), false);
		}

	},
	sockets: {
		newMessage(msg) {
			this.recieveMessage(msg);
		},
		left() {

			this.errorMessage = 'Your chat partner disconnected. Now routing you back to the main page...';

			setTimeout(() => {
				this.errorMessage = '';
				this.$emit('left');
			}, 4000);
			
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

.errorContainer {
	height: 100vh;
	position: relative;
}

.error {
	position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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