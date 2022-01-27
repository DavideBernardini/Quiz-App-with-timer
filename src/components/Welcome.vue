<template>
    <div class="wrapper">
        <p>
            benvenuto nel test di fine modulo
        </p>
        <p>
            per superare il test devi rispondere correttamente ad almeno 2 domande su 3
        </p>
        <p>
            clicca il pulsante inizia per cominciare
        </p>
        <button @click="startTest()">
            Start test
        </button>
    </div>
</template>

<script>
import dataShared from './../share/dataShared';

export default {
    name: 'Welcome',
    data() {
        return {
            dataShared,
            
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

</style>