<template>
  <div id="app">
    <Start 
      v-if="!chatting" 
      @startChat="startChat" 
      :socketId="socketId"/>
    <SimpleChat 
      v-if="chatting" 
      :name="username"
      :socketId="socketId" />
  </div>
</template>

<script>
import Start from './components/simpleChat/Start.vue';
import SimpleChat from './components/simpleChat/SimpleChat.vue';

export default {
  name: 'App',
  components: {
    Start,
    SimpleChat
  },
  data() {
    return {
      chatting: false,  // *** Allows change between "Start" and "SimpleChat" for testing
      username: "",
      socketId: null,
      connected: false
      // test: ["a", "b", "c", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"]
    }
  },
  methods: {
    startChat: function(val) {
      this.username = val;
      this.chatting = true;
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
