<template>
    <input class="input" :value="modelValue" @input="updateInput" type="text">
</template>

<script>
    export default {
        name: 'simple-input',
        props: {
            modelValue: [String, Number]
        },
        methods: {
            updateInput() {
                this.$emit('update:modelValue', event.target.value)
            }
        }
    }
</script>

<style>
.input {
    width: 100%;
    padding: 10px 15px;
    border: 1px solid teal;
    
    margin-top: 15px;
}
</style>