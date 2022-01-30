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
    position: relative;
    display: flex;
    background: linear-gradient(-45deg, #D5ABCC, #E8CFE3, #B1D8E2, #6fc6dc,);
	background-size: 400% 400%;
	animation: gradient 30s ease infinite;
    * {
        scroll-behavior: smooth;
    }
}
@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
</style>
