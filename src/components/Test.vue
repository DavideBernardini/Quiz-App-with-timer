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
    height: 515px;
}
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
        &-container {
            display: flex;
            width: 830px;
            height: 205px;
            align-items: center;
            margin: 0 20px 0 8px;
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
            flex-shrink: 0;
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
        .slider {
            display: flex;
            &-wrap {
                overflow: hidden;
            }
            &-transition-right {
                transition: 0.35s;
                transform: translateX(-285px);
            }
            &-transition-left {
                transition: 0.35s;
                transform: translateX(0px);
            }
            .btn {
                display: inline-block;
                width: 40px;
                height: 40px;
                font-size: 30px;
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
                border: 3.5px solid #1f1f1f;
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
    width: 600px;
    height: 300px;
    border-radius: 1rem;
    h3 {
        font-size: 34px;
    }
    p {
        margin: 20px 0 35px;
        font-size: 17px;
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
  transform: translateY(-30px);
  opacity: 0;
}

// responsive
// xl
@media screen and (max-width: 1300px) {
    .wrapper {
        height: 505px;
    }
    .test {
        .time-left {
            font-size: 30px;
            i {
                font-size: 28px;
            }
        }
        .question {
            font-size: 33px;
        }
        .question-info {
            font-size: 17px;
        }
        .answers {
            &-container {
                width: 758px;
                height: 178px;
            }
            &-card {
                box-shadow: 0 0.7rem 1.3rem 0 rgba(0, 0, 0, 0.1);
                width: 210px;
                height: 110px;
                margin: 0 24px;
                label {
                    font-size: 19px;
                }
            }
            .slider {
                &-transition-right {
                    transform: translateX(-258px);
                }
            }
            .btn {
                width: 38px;
                height: 38px;
                font-size: 28px;
                }
            .btn.left {
                i {
                    transform: translateX(-2px);  
                }
            }
            .btn.right {
                i {
                    transform: translateX(2px);  
                }
            }
        }
    }
    .min-Answers-msg {
        height: 290px;
    }
    .timeout {
    h2 {
        font-size: 60px;
    }
    p {
        font-size: 21px;
        margin: 30px 0 45px;
    }
    .btn {
        width: 140px;
        height: 42px;
        font-size: 16px;
    }
}
}
// l
@media screen and (max-width: 1100px) {
    .wrapper {
        height: 505px;
    }
    .test {
        .time-left {
            font-size: 28px;
            i {
                font-size: 26px;
            }
        }
        .question {
            font-size: 33px;
        }
        .question-info {
            font-size: 17px;
        }
        .answers {
            &-container {
                width: 544px;
            }
            &-card {
                box-shadow: 0 0.7rem 1.3rem 0 rgba(0, 0, 0, 0.1);
                width: 230px;
                height: 110px;
                margin: 0 24px;
                label {
                    font-size: 18px;
                }
            }
            .slider {
                &-transition-right {
                    -webkit-transition: 0.45s;
                    -moz-transition: 0.45s;
                    -ms-transition: 0.45s;
                    -o-transition: 0.45s;
                    transition: 0.45s;
                    transform: translateX(-560px);
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
                width: 38px;
                height: 38px;
                font-size: 28px;
                }
            .btn.left {
                i {
                    transform: translateX(-2px);  
                }
            }
            .btn.right {
                i {
                    transform: translateX(2px);  
                }
            }
        }
    }
    .min-Answers-msg {
        height: 290px;
    }
    .timeout {
    h2 {
        font-size: 58px;
    }
    p {
        font-size: 20px;
        margin: 30px 0 40px;
        text-align: center;
    }
    .btn {
        width: 140px;
        height: 42px;
        font-size: 16px;
    }
}
}
// m
@media screen and (max-width: 870px) {
    .wrapper {
        height: 525px;
    }
    .btn {
        margin: 15px 0 0;
    }
    .test {
        .time-left {
            font-size: 28px;
            i {
                font-size: 26px;
            }
        }
        .question {
            font-size: 30px;
            margin-top: 10px;
        }
        .question-info {
            font-size: 16px;
        }
        .answers {
            &-container {
                width: 493px;
                margin: 0 15px 0 8px;
            }
            &-card {
                box-shadow: 0 0.7rem 1.3rem 0 rgba(0, 0, 0, 0.1);
                width: 210px;
                height: 110px;
                margin: 0 20px;
                label {
                    font-size: 17px;
                }
            }
            .slider {
                &-transition-right {
                    transition: 0.5s;
                    transform: translateX(-500px);
                }
                &-transition-left {
                    transition: 0.5s;
                }
                .btn {
                    font-size: 40px;
                    background: none;
                    color: #1f1f1f;
                    }
                .btn.left {
                    transform: translate(10px);
                }
                .btn.right {
                    transform: translate(-10px);
                }
                .btn.inactive {
                    border: none;
                    opacity: 0.5;
                }
            }
        }
    }
    .min-Answers-msg {
        height: 290px;
        width: 580px;
    }
    .timeout {
        p {
            font-size: 18px;
        }
    }
}
// s
@media screen and (max-width: 630px) {
    .wrapper {
        height: 570px;
    }
    .btn {
        margin: 15px 0 0;
    }
    .test {
        .time-left {
            font-size: 26px;
            i {
                font-size: 24px;
            }
        }
        .question {
            font-size: 30px;
            margin-top: 5px;
        }
        .question-info {
            font-size: 16px;
        }
        .answers {
            &-container {
                @include flex-center-column-xy;
                width: 100%;
                height: 208px;
                margin: 0;
            }
            &-card {
                box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
                width: 97%;
                height: 35px;
                margin: 12px 0 0 0;
                border-radius: 18px;
                label {
                    font-size: 17px;
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
                    transform: translateX(-500px);
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
        height: 256px;
        width: 390px;
        padding: 30px;
        text-align: center;
        h3 {
        font-size: 28px;
        }
        p {
            margin: 12px 0 30px;
            font-size: 16px;
        }
    }
    .timeout {
        h2 {
        font-size: 47px;
        }
    }
}
</style>