<template>
    <div id="app">
        <transition name="appear-down" appear mode="out-in">
            <Welcome v-if="dataShared.testStarted == false && dataShared.endTest == false"/>
        </transition>

        <transition name="appear-left">
            <Test v-if="dataShared.testStarted == true && dataShared.endTest == false"/>
        </transition>

        <transition name="appear-scale">
            <Feedback v-if="dataShared.endTest == true"/>
        </transition>
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
    background: linear-gradient(-45deg, #D5ABCC, #a8e3f1, #E8CFE3,  #80ccdf,);
	background-size: 400% 400%;
	animation: gradient 20s ease infinite;
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
// transitions
// Welcome
.appear-down-enter-active {
  transition: all 0.8s ease;
}
.appear-down-enter {
  transform: translateY(-1.25rem);
  opacity: 0;
}
// Test
.appear-left-enter-active {
  transition: all 0.8s ease;
}
.appear-left-enter {
  transform: translatex(1.875rem);
  opacity: 0;
}
// feedback 
.appear-scale-enter-active {
  transition: all 0.4s ease;
}
.appear-scale-enter {
  transform: scale(50%);
  opacity: 0;
}
</style>
