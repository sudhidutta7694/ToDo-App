<template>
    <div class="p-20 flex flex-col gap-6 items-center">
        <p class="text-4xl md:text-5xl font-serif font-bold text-indigo-700">Create ToDo</p>
        <ToDoCreator @create-Todo="createTodo"/>
        <ul class="flex flex-col gap-4 items-center justify-center">
            <ToDoItem v-for="todo in todoList" :todo="todo"/>
        </ul>
    </div>
</template>

<script setup>
import {ref} from "vue"
import {uid} from "uid"
import ToDoCreator from '../components/ToDoCreator.vue'
import ToDoItem from "../components/ToDoItem.vue";

const todoList = ref([])

const createTodo = (todo) => {
    todoList.value.push ({
        id: uid(),
        todo,
        isCompleted: false,
        isEditting: false,
    })
}
</script>

<style lang="scss" scoped>
input::placeholder {
    /* Custom placeholder styles */
    color: black;
    font-style: italic;
    font-size: large;
    font-weight: bold;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}</style>