<template>
  <div id="app">
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
      chatting: false,
      username: ""
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
</style>
