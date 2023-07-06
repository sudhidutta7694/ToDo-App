<template>
    <div>
      <div type="text" class="w-[80vw] md:w-[70vw] lg:w-[50vw] Create-Todo flex justify-center items-center">
        <p>
          <input class="bg-indigo-300 text-black font-semibold font-serif text-xl rounded-l-full border-2 shadow-xl border-indigo-700 pl-6 p-2 w-[70vw] md:w-[65vw] lg:w-[45vw] hover:bg-indigo-200 active:bg-indigo-200 active:border-2 active:border-indigo-800 transition-all ease-in duration-300"
            type="text" v-model="todoObject.todo" placeholder="Add your todos here..." />
        </p>
        <button class="rounded-r-full bg-indigo-700 px-3 py-2 shadow-xl hover:bg-indigo-800 transition-all ease-in duration-300 text-2xl text-slate-100 font-bold text-center font-serif"
          @click="createTodo">
          <i class="fas fa-plus hover:scale-110 transition-all ease-in duration-300"></i>
        </button>
      </div>
      <div v-show="todoObject.invalid">
        <ErrorPopup @dismiss="dismissError" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive } from "vue";
  import ErrorPopup from "./ErrorPopup.vue";
  
  const emit = defineEmits(["create-Todo"]);
  
  const todoObject = reactive({
    todo: "",
    invalid: false,
    errMsg: "",
  });
  
  const createTodo = () => {
    todoObject.invalid = false;
    if (todoObject.todo.trim() !== "") {
      emit("create-Todo", todoObject.todo);
    } else {
      todoObject.errMsg = "The Todo cannot be empty";
      todoObject.invalid = true;
    }todoObject.todo = "";
  };
  
  const dismissError = () => {
    todoObject.invalid = false;
  };
  </script>
  
  <style lang="scss" scoped>
  input::placeholder {
    /* Custom placeholder styles */
    color: black;
    font-size: large;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }
  </style>
  