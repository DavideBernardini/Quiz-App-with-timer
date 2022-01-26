<template>
    <div id="app">
        <Welcome v-if="dataShared.testStarted == 0"/>
        <Test v-if="dataShared.testStarted == 1"/>
    </div>
</template>

<script>
import dataShared from './share/dataShared';
import Welcome from './components/Welcome.vue'
import Test from './components/Test.vue';

export default {
    name: "App",
    components: {
        Welcome,
        Test
    },
    data() {
        return {
            dataShared
        }
    }
};
</script>

<style lang="scss">
@import './assets/style/common.scss';

#app {
    height: 100vh;
    display: flex;
}
</style>
