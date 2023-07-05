<template>
    <div class="bg-gradient-to-b from-indigo-50 to-indigo-100  flex justify-around gap-3 items-center py-4 sm:px-12 md:px-16 lg:px-20 xl:px-24">
        <div class="left-container flex justify-center items-center">
            <div class="w-20 sm:w-24 img-container rounded-full">
            <img class="cursor-pointer hover:scale-110 hover:drop-shadow-lg shadow-indigo-500 transition-all ease-in duration-300" src="https://www.pngall.com/wp-content/uploads/8/Task-List-PNG-Picture.png" alt="" srcset="">
            </div>
            <div class="name">
                <p class="font-serif text-indigo-900 text-2xl sm:text-3xl font-bold">Todo App</p>
            </div>
        </div>
        <div class="right-container flex space-x-3 text-xl sm:text-2xl font-serif font-semibold items-center">
            <!-- <RouterLink to="/" class="home cursor-pointer text-indigo-800 hover:text-indigo-500 transition-colors duration-300">Home</RouterLink> -->
            <!-- <RouterLink to="/history" class="home cursor-pointer text-indigo-800 hover:text-indigo-500 transition-colors duration-300">History</RouterLink>
            <RouterLink to="/others" class="about cursor-pointer text-indigo-800 hover:text-indigo-500 transition-colors duration-300">Others</RouterLink> -->
        </div>
        <img :src="photoURL" class="rounded-full border-2 border-indigo-900 w-9 h-9 md:w-11 md:h-11 hover:scale-110 transition-all duration-200 ease-in hover:drop-shadow-md bg-indigo-900" />
        
        
    </div>
</template>

<script setup>
// import { RouterLink } from 'vue-router';
const photoURL = JSON.parse(localStorage.getItem("user")).photoURL;
console.log(photoURL)
</script>

<style lang="scss" scoped>

</style>