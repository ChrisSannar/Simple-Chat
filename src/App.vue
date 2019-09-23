<template>
  <div id="app">
    <Start 
      ref="start"
      v-if="!chatting" 
      @startChat="startChat" 
      :socketId="socketId"
      :pairSocketId="pairSocketId"/>
    <SimpleChat 
      v-if="chatting" 
      @left="chatterLeft"
      :name="username"
      :foreignName="pairUsername"
      :socketId="socketId" 
      :foreignSocketId="pairSocketId"/>
  </div>
</template>

<script>
import Start from './components/simpleChat/Start.vue';
import SimpleChat from './components/simpleChat/SimpleChat.vue';

import SimpleChatMessage from './SimpleChatMessage.js';

export default {
  name: 'App',
  components: {
    Start,
    SimpleChat
  },
  // ***
  created() {

  },
  // ***
  data() {
    return {
      chatting: false,    // *** Allows change between "Start" and "SimpleChat" for testing
      username: "",       // The local and foreign names and socket ids respectively
      pairUsername: "",
      socketId: null,
      pairSocketId: null,
      connected: false,
      temp: null
      // test: ["a", "b", "c", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"]
    }
  },
  methods: {
    startChat: function(val) {

      // Set all the new info
      this.username = val[0];
      this.pairUsername = val[2];
      this.pairSocketId = val[1];

      // Then swap to the new chatting screen
      this.chatting = true;
    },

    chatterLeft: function() {
      this.chatting = false;
    }

  },
  sockets: {

    connect(data) {
      this.connected = true;
    },
    disconnect() {
      this.connected = false;
    },

    // When the socket channel is established, get the ID tied to the particular channel
    init(data) {
      this.socketId = data;
    }
  }
}
</script>

<style>
/* #app {
  height: 500px;
  background: yellow;
  display: flex;
  flex-direction: column-reverse;
  align-content: flex-end;
} */
</style>
