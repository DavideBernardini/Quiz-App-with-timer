<template>
    <div id="app">
        <Welcome v-if="dataShared.testStarted == false && dataShared.endTest == false"/>
        <Test v-else-if="dataShared.testStarted == true && dataShared.endTest == false"/>
        <Feedback v-if="dataShared.endTest == true"/>
    </div>
</template>

<script>
import dataShared from './share/dataShared';
import Welcome from './components/Welcome.vue';
import Test from './components/Test.vue';
import Feedback from './components/Feedback.vue'


export default {
    name: "App",
    components: {
        Welcome,
        Test,
        Feedback
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
