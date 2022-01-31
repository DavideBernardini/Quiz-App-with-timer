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
</style>