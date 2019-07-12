<template>
    <div class="chatBodyWrap">
        <div v-for="message in totalMsg" :class="message.class" :key="message.id">
            <span>{{message.text}}</span>
        </div>
    </div>
</template>

<script>
let id = 0;
export default {
    props: ["msg"],
    data() {
        return {
            totalMsg: [],
            test: ""
        };
    },
    methods: {
        clearMessage: function() {
            this.$emit("clearMsg", "");
        }
    },
    watch: {
        msg: function(newVal) {
            if (newVal){
                let newMsg = {text: newVal, class: "localMsg", id: id++};
                this.totalMsg.push(newMsg);
                this.clearMessage();
            }
        }
    }
}
</script>

<style>
    .chatBodyWrap {
        margin: 10px 0px;
    }
    .localMsg {
        text-align: left;
        padding: 0.25em;
        margin: 5px;
    }
    .localMsg > span {
        background: #42b883;
        color: white;
        padding: 0.25em 0.6em;
        font-size: 20px;
        border-radius: 5px;
        
    }
</style>