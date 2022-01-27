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
        <button @click="[dataShared.testStarted++, dataShared.timer()]">
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
}
</script>

<style lang="scss" scoped>

</style>