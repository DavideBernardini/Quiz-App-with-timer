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
                <span v-else>Rientri nel</span>
                 <span>{{feedback.percentage}}%</span>
            </div>
        </div>
        <div class="retry-message">
            <div class="retry" v-if="dataShared.attempts < 2 && dataShared.score < 2">
                Hai un altro tentativo, clicca per riprovare
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
    text-align: center;
    width: 1000px;
    height: 460px;
    h2 {
        font-size: 75px;
    }
    .score {
        font-size: 25px;
        font-size: 25px;
        margin: 10px 0 30px;
        &-percentage {
            span {
                vertical-align: middle;
            }
        }
    }
    .retry-message {
        font-size: 18px;
        font-weight: 500;
    }
    .btn {
        display: inline-block;
        width: 45px;
        height: 45px;
        font-size: 20px;
        margin-left: 5px;
    }
}
</style>