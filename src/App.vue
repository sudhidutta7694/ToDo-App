<script setup>
import { RouterView } from 'vue-router'
import ToDoHeader from './components/ToDoHeader.vue'
</script>

<template>
  <ToDoHeader />
  <RouterView />
</template>

<style>
  body {
    background-color: rgb(233, 237, 250);
  }
</style>
