<template>
    <div class="wrapper">
        <!-- ciclo su quesiti random -->
        <div v-for="(item, index) in randomQuestions.slice(x,y)" :key="index">
            <h2 class="question">
                {{item.question}}
            </h2>
            <!-- ciclo se risposta multipla -->
            <div class="answers" v-if="item.multipleChoice">
                <div v-for="(element, i) in item.answers" :key="i">
                    <input type="checkbox" name="answers" 
                    :id="i" 
                    :value="element" 
                    v-model="dataShared.checkedAnswers">
                    <label :for="i" :class="selected(element)">
                        {{element.answer}}
                    </label> 
                </div>
            </div>
            <!-- /ciclo se risposta multipla -->
            <!-- ciclo se risposta singola -->
            <div class="answers" v-else>
                <div v-for="(element, i) in item.answers" :key="i">
                    <input type="radio" name="answers" 
                    :id="i" 
                    :value="element" 
                    v-model="dataShared.checkedAnswers">
                    <label :for="i" :class="{'selected' : element == dataShared.checkedAnswers}">
                        {{element.answer}}
                    </label> 
                </div>
            </div>
            <!-- /ciclo se risposta singola -->
        </div>
        <!-- ciclo su quesiti random -->
        <button @click="next()">NEXT</button>
    </div>
</template>

<script>
import dataShared from './../share/dataShared';

export default {
    name: 'Test',
    data() {
        return {
            dataShared,
            x: 0,
            y: 1
        }
    },
    computed: {
        randomQuestions() {
            let questions = [];
            while (questions.length < 3) {
                let n = Math.floor(Math.random() * this.dataShared.TestQuestions.length);
                if (questions.includes(this.dataShared.TestQuestions[n]) == false) {
                    questions.push(this.dataShared.TestQuestions[n])
                }
            }
            return questions;
        }
    },
    methods: {
        next() {
            if (this.y < this.randomQuestions.length) {
                this.x++;
                this.y++;
                dataShared.checkedAnswers = [];
            }
        },
        selected(el) {
            if (dataShared.checkedAnswers.includes(el)) {
                return "selected";
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.selected {
    color: aqua;
}

</style>