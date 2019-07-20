<template>
  <div id="app">
    <h1>testing</h1>
    <Start @startChat="startChat" v-if="!chatting"/>
    <SimpleChat v-if="chatting" :name="username" />
  </div>
</template>

<script>
import Start from './components/simpleChat/Start.vue';
import SimpleChat from './components/simpleChat/SimpleChat.vue';

export default {
  name: 'app',
  components: {
    Start,
    SimpleChat
  },
  data() {
    return {
      chatting: true,
      username: "",
      // test: ["a", "b", "c"]
    }
  },
  methods: {
    startChat: function(val) {
      this.username = val;
      this.chatting = true;
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
