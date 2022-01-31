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
            dataShared.timer();
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
    font-size: 44px;
    text-align: left;
}
p {
    margin: 22px 0 50px;
    font-size: 20.5px;
    width: 80%;
}
.btn {
    align-self: flex-end;
    margin-right: 55px;
}

// responsive
// xl 
@media screen and (max-width: 1300px) {
    h2 {
        font-size: 36px;
    }
    p {
        margin: 22px 0 40px;
        font-size: 19px;
        width: 75%;
    }
    .btn {
        margin-right: 35px;
    }
}
// l
@media screen and (max-width: 1100px) {
    h2 {
        font-size: 36px;
    }
    p {
        margin: 20px 0 25px;
        font-size: 18px;
        width: 71%;
    }
    .btn {
        margin-right: 35px;
    }
}
// m
@media screen and (max-width: 870px) {
    p {
        margin: 25px 0 36px;
        width: 100%;
    }
    .btn {
        margin: 0 12px 0 0;
    }
}
</style>