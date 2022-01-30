<template>
    <div class="wrapper">
        <!-- timeout -->
        <div class="timeout" v-if="dataShared.timeOut">
            <h2>
                Tempo scaduto
            </h2>
            <p>
                Non hai risposto entro lo scadere del tempo, l'eventuale selezione non sarà conteggiata
            </p>
            <button class="btn" @click="nextQuestion()">
                {{nextOrEnd}}
            </button>
        </div>
        <!-- /timeout -->

        <!-- domanda e risposte -->
        <div class="test" v-else>
            <div class="time-left">
                <i class="fas fa-hourglass-half" ></i>
                {{dataShared.timeLeft}}
            </div>
            <!-- ciclo su quesiti random -->
            <div v-for="(item, index) in randomQuestions.slice(x,y)" :key="index">
                <h2 class="question">
                    {{item.question}}
                </h2>
                <!-- risposta multipla -->
                <div class="answers" v-if="item.multipleChoice">
                    <div class="question-info">
                        Più di una risposta è corretta
                    </div>

                    <div class="answers-container">
                        <!-- slider -->
                        <vue-horizontal class="vue-horizontal-slider">
                            <div class="vue-horizontal-slide"
                            v-for="(element, i) in item.answers" 
                            :key="i">
                                <div class="answers-card">
                                    <input type="checkbox" name="answers" 
                                    :id="i" 
                                    :value="element" 
                                    v-model="dataShared.checkedAnswers">
                                    <label :for="i" :class="checked(element)">
                                        {{element.answer}}
                                    </label> 
                                </div>
                            </div>
                            <!-- slider buttons -->
                            <template v-slot:btn-prev>
                                <button class="btn slides">
                                    <i class="fas fa-angle-left"></i>
                                </button>
                            </template>
                            <template v-slot:btn-next>
                                <button class="btn slides">
                                    <i class="fas fa-angle-right"></i>
                                </button>
                            </template>
                            <!-- /slider buttons -->
                        </vue-horizontal>
                        <!-- /slider -->
                    </div>
                    
                </div>
                <!-- /risposta multipla -->
                <!-- risposta singola -->
                <div class="answers" v-else>
                    <div class="question-info">
                        Solo una risposta è corretta
                    </div>
                    <div class="answers-container">
                        <!-- slider -->
                        <vue-horizontal class="vue-horizontal-slider">
                            <div class="vue-horizontal-slide"
                            v-for="(element, i) in item.answers" 
                            :key="i">
                                <div class="answers-card">
                                    <input type="radio" name="answers" 
                                    :id="i" 
                                    :value="element" 
                                    v-model="dataShared.pickedAnswer">
                                    <label :for="i" 
                                    :class="{'selected' : element == dataShared.pickedAnswer}">
                                        {{element.answer}}
                                    </label> 
                                </div>
                            </div>
                            <!-- slider buttons -->
                            <template v-slot:btn-next>
                                <button class="btn slides">
                                    <i class="fas fa-angle-right"></i>
                                </button>
                            </template>
                            <template v-slot:btn-prev>
                                <button class="btn slides">
                                    <i class="fas fa-angle-left"></i>
                                </button>
                            </template>
                            
                            <!-- /slider buttons -->
                        </vue-horizontal>
                        <!-- /slider -->
                    </div>
                </div>
                <!-- /risposta singola -->
            </div>
            <!-- ciclo su quesiti random -->

            <button class="btn" :class="{'hide-next' : dataShared.timeLeft < 1}"
            @click="[isCorrect(), nextQuestion()]">
                Answer
            </button>

            <!-- Modale minimo risposte -->
            <div class="overlay" v-if="dataShared.minAnswModal">
                <div class="min-Answers-msg">
                    <h3>Non lasciare campi vuoti!</h3>
                    <p>Seleziona almeno due opzioni per le domande a risposta multipla</p>
                    <button class="btn"
                    @click="[dataShared.minAnswModal = false, dataShared.pauseTimer = false]">
                        Resume
                    </button>
                </div>
            </div>
            <!-- /Modale minimo risposte -->
        </div>
        <!-- /domanda e risposte -->
    </div>
</template>

<script>
import dataShared from './../share/dataShared';
import VueHorizontal from 'vue-horizontal';

export default {
    name: 'Test',
    components: {
        VueHorizontal
    },
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
                let n = Math.floor(Math.random() * dataShared.TestQuestions.length);
                if (questions.includes(dataShared.TestQuestions[n]) == false) {
                    questions.push(dataShared.TestQuestions[n])
                }
            }
            return questions;
        },
        nextOrEnd() {
            if (this.y < this.randomQuestions.length) {
                return "Next question";
            } else {
                return "View results";
            }
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
            
            if (dataShared.checkedAnswers.length < 2 && Object.keys(dataShared.pickedAnswer).length == 0 && dataShared.timeOut == false) {
                dataShared.pauseTimer = true;
                return dataShared.minAnswModal = true;
            }
            if (this.y < this.randomQuestions.length) {
                this.x++;
                this.y++;
                dataShared.checkedAnswers = [];
                dataShared.pickedAnswer = {};
                dataShared.timeOut = false;
                dataShared.timeLeft = 10;
            } else if (this.y == this.randomQuestions.length) {
                dataShared.timeOut = false;
                dataShared.timeLeft = 10;
                dataShared.testStarted = false;
                dataShared.endTest = true;
                clearInterval(dataShared.timer);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/partials/mixins.scss';
.btn {
        align-self: flex-end;
        margin: 15px 28px 0;
    }
.test {
    @include flex-column;
    .time-left {
        text-align: right;
        font-size: 33px;
        font-weight: bold;
        .fas {
            font-size: 25px;
        }
    }
    .question {
        font-size: 36px;
    }
    .question-info {
        align-self: flex-start;
        font-weight: 300;
        margin-left: 5px;
        margin-top: 5px;
        font-size: 18px;
    }
    .answers {
        @include flex-center-column-x;
        .vue-horizontal-slider {
            width: 845px;
        }
        &-container {
            display: flex;
            justify-content: center;
            .btn.slides {
                margin: 0;
                align-self: center;
                font-size: 29px;
                .fas {
                    vertical-align: middle;
                    transform: translate(-10%, -6%);
                }
            }
            .vue-horizontal-slide {
                height: 210px;
                display: flex;
                align-items: center;
            }
        }
        &-card {
            background: rgba(255, 255, 255, 0.3);
            box-shadow: 0 0.9rem 1.5rem 0 rgba(0, 0, 0, 0.1);
            border-radius: 1rem;
            width: 220px;
            height: 120px;
            margin: 0 30px;
            transition: transform 200ms ease;
            overflow: hidden;
            label {
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                font-size: 20px;
                text-align: center;
            }
        }
        &-card:hover {
            transform: scale(1.1);
        }
        .btn {
            display: inline-block;
            width: 45px;
            height: 45px;
            font-size: 20px;
            margin-left: 5px;
        }
    }
    
    .hide-next {
        visibility: hidden;
    }
}
.selected {
    background: rgba(255, 255, 255, 0.8);
}
.min-Answers-msg {
    @include flex-center-column-xy;
    @include absolute-center;
    z-index: 10;
    background-color: rgb(240, 248, 255);
    box-shadow: 0 0.9rem 1.5rem 0 rgba(255, 255, 255, 0.1);
    width: 600px;
    height: 300px;
    border-radius: 1rem;
    h3 {
        font-size: 32px;
    }
    p {
        margin: 20px 0 35px;
    }
    .btn {
        align-self: center;
        margin: 0;
    }
}
.overlay::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(51, 51, 51, 0.6);
    background-image: url('../assets/images/blur_black.png');
}
.timeout {
    @include flex-center-column-xy;
    h2 {
        font-size: 65px;
    }
    p {
        font-size: 24px;
        margin: 30px 0 50px;
    }
    .btn {
        width: 150px;
        height: 45px;
        font-size: 18px;
    }
}
</style>