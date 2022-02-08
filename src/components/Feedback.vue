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
    width: 60.625rem;
    height: 27.8125rem;
    h2 {
        font-size: 4.6875rem;
    }
    .score {
        font-size: 1.5625rem;
        margin: .9375rem 0 1.875rem;
        text-align: center;
        &-percentage {
            span {
                vertical-align: middle;
            }
        }
    }
    .retry-message {
        font-size: 1.5rem;
        font-weight: 500;
    }
    .fa-frown {
        font-size: 2rem;
        vertical-align: top;
    }
    .fa-trophy {
        font-size: 2.1875rem;
        vertical-align: bottom;
    }
    .btn {
        display: inline-block;
        width: 2.8125rem;
        height: 2.8125rem;
        font-size: 1.25rem;
        margin-left: .3125rem;
    }
}

// responsive
// xl 
@media screen and (max-width: 81.25rem) {
    .wrapper {
        width: 57.5rem;
        height: 27.25rem;
        h2 {
            font-size: 4.0625rem;
        }
        .score {
            font-size: 1.4375rem;
            margin: 1.25rem 0 2.5rem;
        }
        .retry-message {
            font-size: 1.375rem;
        }
        .fa-frown {
            font-size: 2rem;
            vertical-align: middle;
        }
        .btn {
            width: 2.625rem;
            height: 2.625rem;
            font-size: 1.125rem;
        }
    }
}
// l
@media screen and (max-width: 68.75rem) {
    .wrapper {
        width: 50rem;
        h2 {
            font-size: 3.875rem;
        }
        .score {
            font-size: 1.375rem;
        }
        .retry-message {
            font-size: 1.3125rem;
        }
        .fa-frown {
            font-size: 2rem;
            vertical-align: middle;
        }
        .btn {
            width: 2.625rem;
            height: 2.625rem;
            font-size: 1.125rem;
        }
    }
}
// m
@media screen and (max-width: 54.375rem) {
    .wrapper {
        width: 37.5rem;
        h2 {
            font-size: 3.375rem;
        }
        .score {
            font-size: 1.375rem;
        }
        .retry-message {
            font-size: 1.3125rem;
        }
        .fa-frown {
            font-size: 2rem;
            vertical-align: middle;
        }
        .btn {
            width: 2.625rem;
            height: 2.625rem;
            font-size: 1.125rem;
        }
    }
}
// s
@media screen and (max-width: 39.375rem) {
    .wrapper {
        width: 25.625rem;
        h2 {
            font-size: 2.5rem;
        }
        .score {
            font-size: 1.25rem;
            margin: 1.375rem 0 1.875rem;
        }
        .retry-message {
            font-size: 1.25rem;
        }
        .fa-frown {
            font-size: 2rem;
            vertical-align: middle;
        }
        .btn {
            width: 2.5625rem;
            height: 2.5625rem;
            font-size: 1.0625rem;
        }
    }
}
</style>