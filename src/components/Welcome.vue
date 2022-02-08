<template>
    <div class="wrapper">
        <h2>
            Benvenuto nel test di fine modulo Html/CCS base
        </h2>
        <p>
            Per superare il test devi rispondere correttamente ad almeno 2 domande su 3, alcune domande sono a risposta singola e altre a risposta multipla, per rispondere correttamente a quest'ultime è necessario segnare tutte e soltanto le risposte corrette.
        </p>
        <div class="btn" @click="startTest()">
            Start
        </div>
        
    </div>
</template>

<script>
import dataShared from './../share/dataShared';

export default {
    name: 'Welcome',
    data() {
        return {
            dataShared
        }
    },
    methods: {
        startTest() {
            dataShared.timeOut = false;
            dataShared.timeLeft = 10;
            dataShared.testStarted = true;
            if (dataShared.attempts < 1) {
               dataShared.timer(); 
            }
            dataShared.attempts++;

        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/partials/mixins.scss';

.wrapper {
    @include flex-center-column-y;
}

h2 {
    font-size: 2.75rem;
    text-align: left;
}
p {
    margin: 1.375rem 0 3.125rem;
    font-size: 1.2813rem;
    width: 80%;
}
.btn {
    align-self: flex-end;
    margin-right: 3.4375rem;
}

// responsive
// xl 
@media screen and (max-width: 81.25rem) {
    h2 {
        font-size: 2.25rem;
    }
    p {
        margin: 1.375rem 0 2.5rem;
        font-size: 1.1875rem;
        width: 75%;
    }
    .btn {
        margin-right: 2.1875rem;
    }
}
// l
@media screen and (max-width: 68.75rem) {
    h2 {
        font-size: 2.25rem;
    }
    p {
        margin: 1.25rem 0 1.5625rem;
        font-size: 1.125rem;
        width: 71%;
    }
    .btn {
        margin-right: 2.1875rem;
    }
}
// m
@media screen and (max-width: 54.375rem) {
    p {
        margin: 1.5625rem 0 2.25rem;
        width: 100%;
    }
    .btn {
        margin: 0 .75rem 0 0;
    }
}
// s
@media screen and (max-width: 54.375rem) {
    h2 {
        font-size: 1.75rem;
    }
    p {
        margin: 1.5625rem 0 2.25rem;
        width: 100%;
        font-size: 1rem;
    }
    .btn {
        margin: 0;
    }
}
</style>