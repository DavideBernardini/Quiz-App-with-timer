<template>
    <div class="wrapper">
        <!-- timeout -->
        <transition name="fade-down" mode="out-in">
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
        </transition>

        <!-- /timeout -->

        <!-- domanda e risposte -->
        <transition name="fade-test">
            <div class="test" v-if="!dataShared.timeOut">
                <div class="time-left">
                    <i class="fas fa-stopwatch"></i>
                    {{dataShared.timeLeft}}
                </div>
                
                <!-- ciclo su quesiti random -->
                
                <div v-for="(item, index) in randomQuestions" 
                :key="index">
                    <transition name="fade" mode="in-out">
                        <div class="transition-wrapper" v-if="randomQuestions.indexOf(item) == x">
                            <h2 class="question">
                                {{item.question}}
                            </h2>

                            <!-- risposta multipla -->
                            <div class="answers" v-if="item.multipleChoice">
                                <div class="question-info">
                                    Più di una risposta è corretta
                                </div>

                                <!-- slider -->
                                <div class="slider">

                                    <button class="btn left" 
                                    @click="onTheRight = false"
                                    :class="{'inactive' : !onTheRight}">
                                        <i class="fas fa-angle-left"></i>
                                    </button>

                                    <div class="slider-wrap">
                                        <!-- ciclo risposte -->
                                        <ul class="answers-container"
                                        :class="{'slider-transition-right' : onTheRight, 'slider-transition-left' : !onTheRight}">

                                            <li class="answers-card"
                                            v-for="(element, i) in item.answers" 
                                            :key="i">
                                                <input type="checkbox" name="answers" 
                                                :id="i" 
                                                :value="element" 
                                                v-model="dataShared.checkedAnswers">
                                                <label :for="i" :class="checked(element)">
                                                    {{element.answer}}
                                                </label> 
                                            </li>

                                        </ul>
                                        <!-- /ciclo risposte -->
                                    </div>

                                    <button class="btn right"
                                    @click="onTheRight = true"
                                    :class="{'inactive' : onTheRight}">
                                        <i class="fas fa-angle-right"></i>
                                    </button>
                                    <!-- /slider -->

                                </div>
                            </div>
                            <!-- /risposta multipla -->

                            <!-- risposta singola -->
                            <div class="answers" v-else>
                                <div class="question-info">
                                    Solo una risposta è corretta
                                </div>
                                <!-- slider -->
                                <div class="slider">

                                    <button class="btn left" 
                                    @click="onTheRight = false"
                                    :class="{'inactive' : !onTheRight}">
                                        <i class="fas fa-angle-left"></i>
                                    </button>

                                    <div class="slider-wrap">
                                        <!-- ciclo risposte -->
                                        <ul class="answers-container"
                                        :class="{'slider-transition-right' : onTheRight, 'slider-transition-left' : !onTheRight}">

                                            <li class="answers-card"
                                            v-for="(element, i) in item.answers" 
                                            :key="i">
                                                <input type="radio" name="answers" 
                                                :id="i" 
                                                :value="element" 
                                                v-model="dataShared.pickedAnswer">
                                                <label :for="i" 
                                                :class="{'selected' : element == dataShared.pickedAnswer}">
                                                    {{element.answer}}
                                                </label> 
                                            </li>

                                        </ul>
                                        <!-- /ciclo risposte -->
                                    </div>

                                    <button class="btn right"
                                    @click="onTheRight = true"
                                    :class="{'inactive' : onTheRight}">
                                        <i class="fas fa-angle-right"></i>
                                    </button>
                                    <!-- /slider -->
                                </div>
                            </div>
                            <!-- /risposta singola -->
                        </div>
                    </transition>
                </div>
                
                <!-- ciclo su quesiti random -->

                <button class="btn" :class="{'hide-next' : dataShared.timeLeft < 1}"
                @click="[isCorrect(), nextQuestion()]">
                    Answer
                </button>

                <!-- Modale minimo risposte -->
                <transition name="fade-modal">
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
                </transition>
                <!-- /Modale minimo risposte -->
            </div>
        </transition>
        <!-- /domanda e risposte -->
    </div>
</template>

<script>
import dataShared from './../share/dataShared';

export default {
    name: 'Test',
    components: {
    },
    data() {
        return {
            dataShared,
            x: 0,
            y: 1,
            onTheRight: false
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
        },
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
                this.onTheRight = false;

            } else if (this.y == this.randomQuestions.length) {

                dataShared.timeOut = false;
                dataShared.timeLeft = 10;
                dataShared.testStarted = false;
                dataShared.endTest = true;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/partials/mixins.scss';
.wrapper {
    height: 32.1875rem;
}
.btn {
        align-self: flex-end;
        margin: .9375rem 1.75rem 0;
    }
.test {
    @include flex-column;
    .time-left {
        text-align: right;
        font-size: 2.0625rem;
        font-weight: bold;
        .fas {
            font-size: 1.5625rem;
        }
    }
    .question {
        font-size: 2.25rem;
    }
    .question-info {
        align-self: flex-start;
        font-weight: 300;
        margin-left: .3125rem;
        margin-top: .3125rem;
        font-size: 1.125rem;
    }
    .answers {
        @include flex-center-column-x;
        &-container {
            display: flex;
            width: 51.875rem;
            height: 12.8125rem;
            align-items: center;
            margin: 0 1.25rem 0 .5rem;
        }
        &-card {
            background: rgba(255, 255, 255, 0.3);
            box-shadow: 0 0.9rem 1.5rem 0 rgba(0, 0, 0, 0.1);
            border-radius: 1rem;
            width: 13.75rem;
            height: 7.5rem;
            margin: 0 1.875rem;
            transition: transform 200ms ease;
            overflow: hidden;
            flex-shrink: 0;
            label {
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                font-size: 1.25rem;
                text-align: center;
            }
        }
        &-card:hover {
            transform: scale(1.1);
        }
        .slider {
            display: flex;
            &-wrap {
                overflow: hidden;
            }
            &-transition-right {
                transition: 0.35s;
                transform: translateX(-17.8125rem);
            }
            &-transition-left {
                transition: 0.35s;
                transform: translateX(0rem);
            }
            .btn {
                display: inline-block;
                width: 2.5rem;
                height: 2.5rem;
                font-size: 1.875rem;
                margin: 0;
                align-self: center;
            }
            .btn.left {
                i {
                  transform: translateX(-15%);  
                }
            }
            .btn.right {
                i {
                  transform: translateX(10%);  
                }
            }
            .btn.inactive {
                color: #1f1f1f;
                opacity: 0.8;
                background-color: inherit;
                border: .2188rem solid #1f1f1f;
            }
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
    width: 37.5rem;
    height: 18.75rem;
    border-radius: 1rem;
    h3 {
        font-size: 2.125rem;
    }
    p {
        margin: 1.25rem 0 2.1875rem;
        font-size: 1.0625rem;
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
        font-size: 4.0625rem;
    }
    p {
        font-size: 1.5rem;
        margin: 1.875rem 0 3.125rem;
    }
    .btn {
        width: 9.375rem;
        height: 2.8125rem;
        font-size: 1.125rem;
        align-self: center;
    }
}
// transitions
// questions
.fade-enter-active {
    transition: all 0.6s ease;
}
.fade-enter {
    opacity: 0;
}
// min answers modal fade-modal
.fade-modal-enter-active {
    transition: all 0.2s ease;
}
.fade-modal-leave-active {
    transition: all 0.2s ease;
}
.fade-modal-enter {
    opacity: 0;
}
.fade-modal-leave-to {
    opacity: 0;
}
// test
.fade-test-enter-active {
  transition: all 0.3s ease;
}
.fade-test-enter {
  opacity: 0;
}
// timeout
.fade-down-enter-active {
  transition: all 0.5s ease;
}
.fade-down-enter {
  transform: translateY(-1.875rem);
  opacity: 0;
}

// responsive
// xl
@media screen and (max-width: 81.25rem) {
    .wrapper {
        height: 31.5625rem;
    }
    .test {
        .time-left {
            font-size: 1.875rem;
            i {
                font-size: 1.75rem;
            }
        }
        .question {
            font-size: 2.0625rem;
        }
        .question-info {
            font-size: 1.0625rem;
        }
        .answers {
            &-container {
                width: 47.375rem;
                height: 11.125rem;
            }
            &-card {
                box-shadow: 0 0.7rem 1.3rem 0 rgba(0, 0, 0, 0.1);
                width: 13.125rem;
                height: 6.875rem;
                margin: 0 1.5rem;
                label {
                    font-size: 1.1875rem;
                }
            }
            .slider {
                &-transition-right {
                    transform: translateX(-16.125rem);
                }
            }
            .btn {
                width: 2.375rem;
                height: 2.375rem;
                font-size: 1.75rem;
                }
            .btn.left {
                i {
                    transform: translateX(-0.125rem);  
                }
            }
            .btn.right {
                i {
                    transform: translateX(.125rem);  
                }
            }
        }
    }
    .min-Answers-msg {
        height: 18.125rem;
    }
    .timeout {
    h2 {
        font-size: 3.75rem;
    }
    p {
        font-size: 1.3125rem;
        margin: 1.875rem 0 2.8125rem;
    }
    .btn {
        width: 8.75rem;
        height: 2.625rem;
        font-size: 1rem;
    }
}
}
// l
@media screen and (max-width: 68.75rem) {
    .wrapper {
        height: 31.5625rem;
    }
    .test {
        .time-left {
            font-size: 1.75rem;
            i {
                font-size: 1.625rem;
            }
        }
        .question {
            font-size: 2.0625rem;
        }
        .question-info {
            font-size: 1.0625rem;
        }
        .answers {
            &-container {
                width: 34rem;
            }
            &-card {
                box-shadow: 0 0.7rem 1.3rem 0 rgba(0, 0, 0, 0.1);
                width: 14.375rem;
                height: 6.875rem;
                margin: 0 1.5rem;
                label {
                    font-size: 1.125rem;
                }
            }
            .slider {
                &-transition-right {
                    -webkit-transition: 0.45s;
                    -moz-transition: 0.45s;
                    -ms-transition: 0.45s;
                    -o-transition: 0.45s;
                    transition: 0.45s;
                    transform: translateX(-35rem);
                }
                &-transition-left {
                    -webkit-transition: 0.45s;
                    -moz-transition: 0.45s;
                    -ms-transition: 0.45s;
                    -o-transition: 0.45s;
                    transition: 0.45s;
                }
            }
            .btn {
                width: 2.375rem;
                height: 2.375rem;
                font-size: 1.75rem;
                }
            .btn.left {
                i {
                    transform: translateX(-0.125rem);  
                }
            }
            .btn.right {
                i {
                    transform: translateX(.125rem);  
                }
            }
        }
    }
    .min-Answers-msg {
        height: 18.125rem;
    }
    .timeout {
    h2 {
        font-size: 3.625rem;
    }
    p {
        font-size: 1.25rem;
        margin: 1.875rem 0 2.5rem;
        text-align: center;
    }
    .btn {
        width: 8.75rem;
        height: 2.625rem;
        font-size: 1rem;
    }
}
}
// m
@media screen and (max-width: 54.375rem) {
    .wrapper {
        height: 32.8125rem;
    }
    .btn {
        margin: .9375rem 0 0;
    }
    .test {
        .time-left {
            font-size: 1.75rem;
            i {
                font-size: 1.625rem;
            }
        }
        .question {
            font-size: 1.875rem;
            margin-top: .625rem;
        }
        .question-info {
            font-size: 1rem;
        }
        .answers {
            &-container {
                width: 30.8125rem;
                margin: 0 .9375rem 0 .5rem;
            }
            &-card {
                box-shadow: 0 0.7rem 1.3rem 0 rgba(0, 0, 0, 0.1);
                width: 13.125rem;
                height: 6.875rem;
                margin: 0 1.25rem;
                label {
                    font-size: 1.0625rem;
                }
            }
            .slider {
                &-transition-right {
                    transition: 0.5s;
                    transform: translateX(-31.25rem);
                }
                &-transition-left {
                    transition: 0.5s;
                }
                .btn {
                    font-size: 2.5rem;
                    background: none;
                    color: #1f1f1f;
                    }
                .btn.left {
                    transform: translate(.625rem);
                }
                .btn.right {
                    transform: translate(-0.625rem);
                }
                .btn.inactive {
                    border: none;
                    opacity: 0.5;
                }
            }
        }
    }
    .min-Answers-msg {
        height: 18.125rem;
        width: 36.25rem;
    }
    .timeout {
        p {
            font-size: 1.125rem;
        }
    }
}
// s
@media screen and (max-width: 39.375rem) {
    .wrapper {
        height: 35.625rem;
    }
    .btn {
        margin: .9375rem 0 0;
    }
    .test {
        .time-left {
            font-size: 1.625rem;
            i {
                font-size: 1.5rem;
            }
        }
        .question {
            font-size: 1.875rem;
            margin-top: .3125rem;
        }
        .question-info {
            font-size: 1rem;
        }
        .answers {
            &-container {
                @include flex-center-column-xy;
                width: 100%;
                height: 13rem;
                margin: 0;
            }
            &-card {
                box-shadow: 0rem 0rem .375rem 0rem rgba(0, 0, 0, 0.1);
                width: 97%;
                height: 2.1875rem;
                margin: .75rem 0 0 0;
                border-radius: 1.125rem;
                label {
                    font-size: 1.0625rem;
                }
            }
            &-card:hover {
                transform: none;
                background: rgba(255, 255, 255, 0.7);
            }
            .slider {
                width: 100%;
                &-wrap {
                    width: 100%;
                }
                &-transition-right {
                    transition: 0.5s;
                    transform: translateX(-31.25rem);
                }
                &-transition-left {
                    transition: 0.5s;
                }
                .btn {
                    display: none;
                }
                
            }
        }
    }
    .min-Answers-msg {
        height: 16rem;
        width: 24.375rem;
        padding: 1.875rem;
        text-align: center;
        h3 {
        font-size: 1.75rem;
        }
        p {
            margin: .75rem 0 1.875rem;
            font-size: 1rem;
        }
    }
    .timeout {
        h2 {
        font-size: 2.9375rem;
        }
    }
}
</style>