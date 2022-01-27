<template>
    <div class="wrapper">
        TEMPO SCADUTO, la domanda non verra conteggiata
        <button>prossima domanda</button>
    </div>
</template>

<script>
import dataShared from './../share/dataShared';

export default {
    name: 'Modal',
    data() {
        return {
            dataShared,
            
        }
    },
}
</script>

<style lang="scss" scoped>

</style>