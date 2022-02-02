<template>
    <div class="wrapper">
        <h2 v-if="dataShared.score >= 2">
            Test Superato
        </h2>
        <h2 v-else>
            Test non superato
        </h2>
        <div class="score">
            <div class="score-correct" v-if="feedback.corrects">
                {{feedback.corrects}}
            </div>
            <div class="score-wrong" v-if="feedback.wrong">
                {{feedback.wrong}}
            </div>
            <div class="score-percentage">
                <span v-if="feedback.percentage == 0">
                    Rientri nello 
                </span>
                <span v-else>Rientri nel </span>
                 <span>{{feedback.percentage}}%</span>
            </div>
        </div>
        <div class="retry-message">
            <div class="retry" v-if="dataShared.attempts < 2 && dataShared.score < 2">
                Clicca per riprovare
                <button class="btn" @click="restartTest()">
                    <i class="fas fa-redo-alt"></i>
                </button>
            </div>
            <div v-else-if="dataShared.score < 2">
                Tentativi terminati <i class="far fa-frown"></i>
            </div>
            <div v-else>
                Complimenti! <i class="fas fa-trophy"></i>
            </div>
        </div>
        
    </div>
</template>

<script>
import dataShared from './../share/dataShared';

export default {
    name: 'Feedback',
    data() {
        return {
            dataShared
        }
    },
    computed: {
        feedback() {

            let percentage = (partial, total) => Math.round((100 * partial) / total);
            let feedback = {};

            switch(dataShared.score) {
                case 3:
                    feedback = {
                        corrects: `Hai risposto correttamente a tutte e ${dataShared.score} le domande!`,
                        wrong: false,
                        percentage: percentage(dataShared.score, 3)
                    };
                    break;

                case 2:
                    feedback = {
                        corrects: `Hai risposto correttamente a ${dataShared.score} domande.`,
                        wrong: `Risposte errate: ${3 - dataShared.score}`,
                        percentage: percentage(dataShared.score, 3)
                    };
                    break;
                
                case 1:
                    feedback = {
                        corrects: `Hai risposto correttamente solo a ${dataShared.score} domanda.`,
                        wrong: `Risposte errate: ${3 - dataShared.score}`,
                        percentage: percentage(dataShared.score, 3)
                    };
                    break;
                
                case 0:
                    feedback = {
                        corrects: false,
                        wrong: `Non hai risposto correttamente a nessuna domanda...`,
                        percentage: percentage(dataShared.score, 3)
                    };
                    break;
            }
            return feedback;
        }
    },
    methods: {
        restartTest() {
            dataShared.endTest = false;
            dataShared.checkedAnswers = [];
            dataShared.pickedAnswer = {};
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/partials/mixins.scss';

.wrapper {
    @include flex-center-column-xy;
    width: 970px;
    height: 445px;
    h2 {
        font-size: 75px;
    }
    .score {
        font-size: 25px;
        margin: 15px 0 30px;
        text-align: center;
        &-percentage {
            span {
                vertical-align: middle;
            }
        }
    }
    .retry-message {
        font-size: 24px;
        font-weight: 500;
    }
    .fa-frown {
        font-size: 32px;
        vertical-align: top;
    }
    .fa-trophy {
        font-size: 35px;
        vertical-align: bottom;
    }
    .btn {
        display: inline-block;
        width: 45px;
        height: 45px;
        font-size: 20px;
        margin-left: 5px;
    }
}

// responsive
// xl 
@media screen and (max-width: 1300px) {
    .wrapper {
        width: 920px;
        height: 436px;
        h2 {
            font-size: 65px;
        }
        .score {
            font-size: 23px;
            margin: 20px 0 40px;
        }
        .retry-message {
            font-size: 22px;
        }
        .fa-frown {
            font-size: 32px;
            vertical-align: middle;
        }
        .btn {
            width: 42px;
            height: 42px;
            font-size: 18px;
        }
    }
}
// l
@media screen and (max-width: 1100px) {
    .wrapper {
        width: 800px;
        h2 {
            font-size: 62px;
        }
        .score {
            font-size: 22px;
        }
        .retry-message {
            font-size: 21px;
        }
        .fa-frown {
            font-size: 32px;
            vertical-align: middle;
        }
        .btn {
            width: 42px;
            height: 42px;
            font-size: 18px;
        }
    }
}
// m
@media screen and (max-width: 870px) {
    .wrapper {
        width: 600px;
        h2 {
            font-size: 54px;
        }
        .score {
            font-size: 22px;
        }
        .retry-message {
            font-size: 21px;
        }
        .fa-frown {
            font-size: 32px;
            vertical-align: middle;
        }
        .btn {
            width: 42px;
            height: 42px;
            font-size: 18px;
        }
    }
}
// s
@media screen and (max-width: 630px) {
    .wrapper {
        width: 410px;
        h2 {
            font-size: 40px;
        }
        .score {
            font-size: 20px;
            margin: 22px 0 30px;
        }
        .retry-message {
            font-size: 20px;
        }
        .fa-frown {
            font-size: 32px;
            vertical-align: middle;
        }
        .btn {
            width: 41px;
            height: 41px;
            font-size: 17px;
        }
    }
}
</style>