<template>
    <div class="wrap">
        <h1>Thing Explainer Chat</h1>
        <h3>Chatting, but with Simpler Words</h3>
        <br/>
        <p>Enter your username</p>
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
        <div ref="loading" v-show="!viewGoButton">
          <div class="spinner-ball"></div>
          <p>You will now be paired with a random chatter</p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            disableInput: false,
            viewGoButton: true,
            username: ""
        }
    },
    methods: {
        checkSimpleInput: function(e) {
            if (e.key === "Enter") {
                this.checkUsername();
            }
            let regex = /[A-Za-z0-9_-]/g;
            if (!regex.test(e.key)) {
                e.preventDefault();
            }
        },
        checkUsername: function(e) {
          if (this.username) {
            this.disableInput = true;
            this.viewGoButton = false;

            this.runLoadingSpinner();

            this.$axios.get('http://localhost:8080/connect')
              .then(done => {
                this.viewGoButton = true;
                this.disableInput = false;

                // *** Check to see if username isn't already 

                this.$emit("startChat", this.username);
              })
              .catch(err => {
                this.viewGoButton = this.disableInput = true;
                console.log("BAD");
              })
            } else {
                e.target.blur();
            }
        },
        runLoadingSpinner: function() {
          // console.log(this.$refs['spinner-ball']);
          // console.log(this.$refs['loading']);
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

.spinner-ball {
  margin: 0.2em;
  margin-top: 1.5em;
  size: 2em;
  background: gray;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  display: inline-block;
  animation-duration: 1.5s;
  transition: 0.2s;
  animation-name: loading-bounce;
  animation-iteration-count: infinite;
}

@keyframes loading-bounce {
  from {
    margin-right: 1.5em;
  }

  50% {
    margin-right: -1.5em;
  }

  to {
    margin-right: 1.5em;
  }
}

</style>