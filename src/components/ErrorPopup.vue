<template>
    <div class="error-modal z-1000 fixed inset-0 flex flex-col items-center justify-center bg-opacity-75 bg-gray-800 z-50">
      <!-- <audio ref="errorSound" src="../Windows Error - Sound Effect .mp3"></audio> -->
      <div class="error-box flex flex-col items-center justify-center bg-white rounded-lg p-8 shadow-md border border-red-500">
        <div class="flex items-center justify-center">
          <div class="error-icon drop-shadow-xl shadow-red-600 bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
        </div>
        <h2 class="text-2xl text-center font-bold mt-4">Oops! Error Occurred</h2>
        <p class="text-center text-gray-600 mt-2">{{ errorMessage }}</p>
        <button
          class="rounded-lg bg-green-500 hover:bg-green-600 hover:scale-105 text-white font-semibold py-2 px-4 mt-4 transition-all duration-300"
          @click="dismissError">Got it
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, defineEmits } from "vue";
  
  const errorMessage = "The ToDo cannot be empty.";
  const errorSound = ref(null);
  const emit = defineEmits(["dismiss"]);
  
//   const playErrorSound = () => {
//     errorSound.value.play();
//   };
  
  const dismissError = () => {
    // errorSound.value.pause();
    // errorSound.value.currentTime = 0;
    emit("dismiss");
  };
  
//   onMounted(() => {
//     playErrorSound();
//   });
  </script>
  
  <style scoped>
  .error-modal {
    backdrop-filter: blur(8px);
  }
  
  .error-box {
    animation: slide-up 0.3s ease-out;
  }
  
  @keyframes slide-up {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
  
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>
  