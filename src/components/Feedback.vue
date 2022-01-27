<template>
    <div class="wrapper">
        <h2 v-if="dataShared.score >= 2">
            Test Superato
        </h2>
        <h2 v-else>
            Test non superato
        </h2>
        <div v-if="feedback.corrects" class="score">{{feedback.corrects}}</div>
        <div v-if="feedback.wrong" class="score">{{feedback.wrong}}</div>
        <div class="score">{{feedback.percentage}}%</div>
        <button v-if="dataShared.attempts < 2 && dataShared.score < 2" @click="restartTest()">
            Hai un altro tentativo, clicca per ricominciare il test
        </button>
        <div v-else-if="dataShared.score < 2">
            Tentativi terminati :'(
        </div>
        <div v-else>
            Complimenti!
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

</style>