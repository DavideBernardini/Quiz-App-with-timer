<template>
    <div class="wrapper">
        <!-- modale timeout -->
        <div class="modal" v-if="dataShared.timeOut">
            TEMPO SCADUTO, la domanda non verra conteggiata
            <button @click="nextQuestion()">prossima domanda</button>
        </div>
        <!-- /modale timeout -->

        <!-- domanda e risposte -->
        <div class="test" v-else>
            <div>
                tempo: {{dataShared.timeLeft}}
            </div>
            <!-- ciclo su quesiti random -->
            <div v-for="(item, index) in randomQuestions.slice(x,y)" :key="index">
                <h2 class="question">
                    {{item.question}}
                </h2>
                <!-- ciclo se risposta multipla -->
                <div class="answers" v-if="item.multipleChoice">
                    <small>Più di una risposta è corretta</small>
                    <div v-for="(element, i) in item.answers" :key="i">
                        <input type="checkbox" name="answers" 
                        :id="i" 
                        :value="element" 
                        v-model="dataShared.checkedAnswers">
                        <label :for="i" :class="checked(element)">
                            {{element.answer}}
                        </label> 
                    </div>
                </div>
                <!-- /ciclo se risposta multipla -->
                <!-- ciclo se risposta singola -->
                <div class="answers" v-else>
                    <small>Solo una risposta è corretta</small>
                    <div v-for="(element, i) in item.answers" :key="i">
                        <input type="radio" name="answers" 
                        :id="i" 
                        :value="element" 
                        v-model="dataShared.pickedAnswer">
                        <label :for="i" :class="{'selected' : element == dataShared.pickedAnswer}">
                            {{element.answer}}
                        </label> 
                    </div>
                </div>
                <!-- /ciclo se risposta singola -->
            </div>
            <!-- ciclo su quesiti random -->
            <button @click="[isCorrect(), nextQuestion()]">
                {{skipOrAnswer()}}
            </button>
        </div>
        <!-- /domanda e risposte -->
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
            y: 1,
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
        checked(el) {
            if (dataShared.checkedAnswers.includes(el)) {
                return "selected";
            }
        },
        isCorrect() {
            let isCorrect = (answer) => {
                if (answer.correct) {
                    return true
                }
            };
            if (dataShared.checkedAnswers.every(isCorrect) && dataShared.checkedAnswers.length > 1) {
                dataShared.score++;
            } else if (dataShared.pickedAnswer.correct) {
                dataShared.score++;
            }
        },
        nextQuestion() {
            if (this.y < this.randomQuestions.length) {
                this.x++;
                this.y++;
                dataShared.checkedAnswers = [];
                dataShared.pickedAnswer = {};
                dataShared.timeOut = false;
                dataShared.timeLeft = 10;
            } else if (this.y == this.randomQuestions.length) {
                dataShared.testStarted = false;
                dataShared.endTest = true;
            }
        },
        skipOrAnswer() {
            if (dataShared.checkedAnswers.length != [] ||  Object.keys(dataShared.pickedAnswer).length) {
                return "Rispondi e continua";
            } else {
                return "Salta domanda";
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