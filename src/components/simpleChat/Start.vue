<template>
    <div class="wrap">
      <h1>Thing Explainer Chat</h1>
      <h3>Chatting, but with Simpler Words</h3>
      <br/>
      <p>Enter your (simple) username</p>
      <div class="username-input">
        <span class="input-append">@</span>
        <input 
          class="simpleInput" 
          type="text" 
          maxlength="42"
          v-model="username"
          @keydown="checkSimpleInput"
          :disabled="disableInput" />
        </div>
      <button 
        class="goBtn" 
        @click="checkUsername"
        :disabled="disableInput"
        v-show="viewGoButton">
        GO
      </button>
      <div v-show="!viewGoButton">
        <div class="loader"></div>
        <p>You are now being paired with a random chatter</p>
      </div>
      <p>{{ errorMessage }}</p>
    </div>
</template>
<script>

export default {
  name: 'Start',
  props: ['socketId', 'pairSocketId'],
  data() {
    return {
      disableInput: false,  // Used the disable the input when starting
      viewGoButton: true,   // Controls the view of the 'Go' button
      username: '',
      errorMessage: '',
      // socketId: this.socketId,
      // Bad words...
      badWordList: ['ass', 'damn', 'shit', 'fuck', 'bastard', 'cunt', 'hell', 'bitch'],
    }
  },
  created() {

		// this.adjustEditorWindow();
		// window.onresize = this.adjustEditorWindow;

	},
  watch: {
    socketId: function(val) {
			this.socketId = val;
    },
    pairSocketId: function(val) {
      this.pairSocketId = val;
    }
  },
  methods: {

    // Checks to see if the input is ready to move on to the next stage
    checkSimpleInput: function(e) {
    
      if (e.key === 'Enter') {
        this.checkUsername();
      }

      // Make sure that the input is alpha numeric with only dashes and underscores
      let regex = /[A-Za-z0-9_-]/g;
      if (!regex.test(e.key)) {
        e.preventDefault();
      }
    },

    checkBadWord: function(wurd) {
      let word = wurd.toLowerCase();
      for (let badWord in this.badWordList) {
        if (word.indexOf(this.badWordList[badWord]) >= 0) {
          return true;
        }
      }
      return false;
    },

    // Makes sure the username is not a copy and is valid to start the app
    checkUsername: function(e) {
      if (this.username) {

        if (this.checkBadWord(this.username)) {
          this.setErrorMessage('Please, have some class.');
          return;
        }

        this.disableInput = true;
        this.viewGoButton = false;

        // Send a connection request to the server
        this.$socket.emit('getChatPartner', this.username);

        } else {
            e.target.blur();
        }
    },

    setErrorMessage: function(msg) {
      this.errorMessage = msg;
      setTimeout(() => {
        this.disableInput = false;
        this.errorMessage = '';
      }, 4000);
    }

  },
  sockets: {
    chatterFound: function(info) {
      this.viewGoButton = true;
      this.disableInput = false;

      this.pairSocketId = info[0];

      // Starts the application if the username is good
      this.$emit('startChat', [this.username, info[0], info[1]]);
    }
  }
}
</script>
<style>

.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 12%;
}

textarea input {
  border:none;
  background-image:none;
  background-color:transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none;
}

textarea:focus, input:focus{
  outline: none;
}

.simpleInput {
  text-align: center;
  transition: 0.2s;
  width: 400px;
  font-size: 20px;
  padding: 10px;
  border: solid #cccccc;
  border-radius: 10px;
  /* border-top-right-radius: 10px;
  border-bottom-right-radius: 10px; */
}

.username-input {
  display: inline;
}

.input-append {
  background: #e3e3e3;
  border: solid #cccccc;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  width: 2em;
  font-size: 20px;
  padding: 10px;
  display: none;
}

.goBtn {
  color: white;
  background: #42b883;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 1em;
  font-size: 1.3em;
  width: 4em;
  height: 1.5em;
}

.goBtn:active,
.goBtn:focus,
.goBtn:focus:active {
  background-image: none;
  outline: 0;
  box-shadow: none;
  background: #44d493;
}

.loader {
  margin: 1em auto;
  border: 8px solid #f3f3f3; 
  border-top: 8px solid #44d493;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>