<template>
    <div class="chatInputWrap">
        <input
            class="simpleInput" 
            type="text"
            v-model="text"
            @keyup="validateInput">
        <br>
        <p 
            v-if="showInvalid && invalidWordList"
            class="invalidWords">
            Invalid Words: {{invalidWordList}}</p>
    </div>
</template>

<script>
import fromWords from '../../assets/words.js';

export default {
    data() {
        return {
            text: "",
            valid: true,
            simpleWords: {},
            invalidWordList: "",
            invalidWords: {},
            showInvalid: false,
            timeout: null
        }
    },
    created: function () {
        let temp = fromWords.words.split('|');
        temp.forEach(word => {
            this.simpleWords[`${word}`] = true;
        });
        this.timeout = setTimeout(() => {}, 0);
    },
    methods: {

        // Make sure the input is proper
        validateInput: function(e) {
            // handle if we're submitting
            if (e.key == "Enter") {
                e.preventDefault();
                if (this.valid) {
                    this.submitText(this.text);
                    this.text = "";
                } else {
                    let box = document.querySelector(".simpleInput");
                    box.classList.add("badInput");
                    setTimeout(() => {
                        box.classList.remove("badInput");
                    }, 400);
                }
            }

            //G et the input and process it
            let simpleInput = this.text.split(" ");
            this.valid = true;
            this.showInvalid = false;
            this.invalidWords = {};
            clearTimeout(this.timeout);
            simpleInput.forEach(word => {
                let strippedWord = word.replace(/[.,/#!?$%^&*;:{}=\-_`~()]/g,"");
                if (this.simpleWords[`${strippedWord.toLowerCase()}`] == true) {
                    // do nothing... this just works here.
                } else if (strippedWord != "") {
                    this.valid = false;
                    this.invalidWords[`${strippedWord}`] = true;
                }
                if (this.invalidWords && Object.keys(this.invalidWords).length > 0) {
                    this.valid = false;
                    this.timeout = setTimeout(() => {
                        this.showInvalid = true;
                        this.setInvalidWords(Object.keys(this.invalidWords));
                    }, 400);
                }
            })
        },
        // Gathers the words together that are failures
        setInvalidWords: function(words) {
            this.invalidWordList = "";
            for (let i = 0; i < words.length - 1; i++) {
                this.invalidWordList += words[i] + ", ";
            }
            this.invalidWordList += words[words.length - 1];
        },
        // Send the text to the chat body.
        submitText: function(text) {
            this.$emit('submitMessage', text);
        }
        
    }
}
</script>

<style>
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
        transition: 0.2s;
        width: 100%;
        font-size: 20px;
        padding: 10px;
        border: solid #cccccc;
        border-radius: 10px;
        text-align: left;
        bottom: 2em;;
    }
    .invalidWords {
        position: fixed;
        bottom: 0;
    }
    .chatInputWrap {
        /* width: 500px; */
        width: 100%;
        
    }
    .badInput {
        border: solid #a00;
    }
</style>