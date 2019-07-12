<template>
    <div class="wrap">
        <ChatBody :msg="text" @clearMsg="clearMessageToBody"/>
        <ChatInput @submitMessage="addMessageToBody"/>
    </div>
</template>

<script>
import Start from './Start.vue';
import ChatInput from './ChatInput.vue';
import ChatBody from './ChatBody.vue';

export default {
    name: 'SimpleChat',
    props: ["name"],
    components: {
        Start,
        ChatInput,
        ChatBody
    },
    data () {
        return {
            text: "",
            username: "",
            displayMain: false
        }
    },
    created() {

        // this.adjustEditorWindow();
        // window.onresize = this.adjustEditorWindow;
        
    },
    watch: {
        name: function (val) {
            this.username = val;
        }
    },
    methods: {
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
    }
}
</script>

<style>

.wrap {
    margin-top: 3em;
    /* height: 100%; */
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