<template>
    <div ref="box" class="boxWrap">
        <div class="chatBodyWrap">
            <div v-for="message in totalMsg" :class="message.class" :key="message.id">
                <div>{{ message.text }}</div>
                <p>{{ message.user }}</p>
            </div>
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
        };
    },
    updated() {
        var container = this.$refs.box;
        container.scrollTop = container.scrollHeight;
    },
    methods: {
        clearMessage: function() {
            this.$emit('clearMsg', '');
        }
    },
    watch: {
        msg: function(newVal) {
            if (newVal) {

                // The new message to be added to the body given the properties of the 'newVal'
                let newMsg = {
                    text: newVal.msg.getMsg(), 
                    class: `${ newVal.local ? 'localMsg' : 'foreignMsg' } msg`, 
                    user: newVal.msg.getSender(),
                    date: newVal.msg.getTime(), 
                    id: id++
                };
                this.totalMsg.push(newMsg);

                // Scroll to the bottom of the feed instead of jumping around
                // let temp = this.$el.querySelector('.chatBodyWrap');
                // console.log('SCROLL', temp.scrollTop, temp.offsetHeight);
                // temp.scrollTop += 60;
                // console.log('SCROLL2', temp.scrollTop, temp.scrollHeight);
                // console.log(temp);

                this.clearMessage();
            }
        }
    }
}
</script>

<style>
    .boxWrap {
        flex: 1;
        display: flex;
        overflow: auto;
        width: 105%;
    }
    .chatBodyWrap {
        width: 100%;
        margin: 10px 0px;
        overflow-y: scroll;
        display: flex;
        min-height: min-content;
        flex-direction: column;
        /* This is the cause of the bug, but because javascript is broken, it doesnt't work */
        justify-content: flex-end; 
    }
    /* Here's an alternative, but it comes with worse bugs of it's own, hence why it's not implemented */
    .chatBodyWrap > :first-child{
        /* margin-top: auto !important; */
    }
    .msg {
        padding: 0.25em;
        font-family: system-ui;
    }
    .msg > div {
        display: inline-block;
        padding: 0.25em 0.6em;
        font-size: 20px;
        border-radius: 5px;
    }
    .msg > p {
        margin: 0;
        font-size: 10px;
        color: #333333;
    }
    .localMsg {
        text-align: left;
    }
    .localMsg > div {
        background: #42b883;
        color: white;
    }
    .foreignMsg {
        text-align: right;
    }
    .foreignMsg > div {
        background: #e3e3e3;
        color: #333333;
    }
</style>