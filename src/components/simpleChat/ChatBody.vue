<template>
    <div class="chatBodyWrap">
        <div v-for="message in totalMsg" :class="message.class" :key="message.id">
            <div>{{message.text}}</div>
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

                // *** testing
                let newMsg2 = {text: newVal, class: "foreignMsg", id: id++};
                this.totalMsg.push(newMsg2);
                // ***

                this.clearMessage();
            }
        }
    }
}
</script>

<style>
    .chatBodyWrap {
        width: 105%;
        margin: 10px 0px;
        overflow: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
    .localMsg {
        text-align: left;
        padding: 0.25em;
    }
    .localMsg > div {
        background: #42b883;
        color: white;
        padding: 0.25em 0.6em;
        font-size: 20px;
        border-radius: 5px;
        display: inline-block;
    }
    .foreignMsg {
        text-align: right;
        padding: 0.25em;
    }
    .foreignMsg > div {
        background: #e3e3e3;
        padding: 0.25em 0.6em;
        font-size: 20px;
        border-radius: 5px;
        display: inline-block;
    }
</style>