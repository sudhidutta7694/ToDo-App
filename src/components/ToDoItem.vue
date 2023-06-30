<template>
    <div>
        <li
            class="w-[78vw] md:w-[68vw] lg:w-[48vw] px-4 py-2 bg-indigo-200 rounded-xl flex justify-between shadow-xl hover:shadow-2xl ease-in hover:scale-x-105 transition-all duration-100">
            <input type="checkbox" :checked="todo.isCompleted" class="custom-checkbox" :id="`todo-checkbox-${todo.id}`"
                @change="toggleCompleted" />
            <label :for="`todo-checkbox-${todo.id}`"></label>
            <div class="todo">
                <input v-if="todo.isEditting" type="text" :value="todo.todo">
                <div v-else class="text-center text-2xl max-w-[50vw] md:max-w-[48vw] lg:max-w-[38vw] overflow-hidden font-semibold font-serif">{{ todo.todo }}</div>
            </div>
            <div class="todoActions flex gap-1">
                <i v-if="todo.isCompleted"
                    class="hover:drop-shadow-lg hover:scale-105 transition-all ease-in duration-300 text-3xl fas fa-check-circle text-green-500"></i>
                <i v-if="todo.isCompleted"
                    class="hover:drop-shadow-lg hover:scale-105 transition-all ease-in duration-200 text-3xl fas fa-times-circle text-red-500"></i>
                <i
                    class="hover:drop-shadow-lg hover:scale-105 transition-all ease-in duration-200 text-3xl fas fa-edit text-green-500"></i>
                <i
                    class="hover:drop-shadow-lg hover:scale-105 transition-all ease-in duration-200 text-3xl fas fa-trash-alt text-red-500"></i>


            </div>
        </li>
    </div>
</template>

<script>
export default {
    props: {
        todo: {
            type: Object,
            required: true,
        },
    },
    mounted() {
        this.animateTick();
    },
    methods: {
        toggleCompleted() {
            // Handle the logic to update the completed state of the todo
        },
        animateTick() {
            if (this.todo.isCompleted) {
                const tick = this.$el.querySelector(".animate-tick");
                tick.classList.add("animate-tick-scale");
            }
        },
    }
}
</script>

<style scoped>


.custom-checkbox {
  opacity: 0;
  position: absolute;
}

.custom-checkbox + label {
  position: relative;
  margin-top: 8px;
  width: 20px;
  height: 20px;
  border: 2px solid gray;
  border-radius: 50%;
  cursor: pointer;
  transition: border-color 0.3s;
}

.custom-checkbox:checked + label::before {
  content: "";
  position: absolute;
  z-index: 100;
  top: 20%;
  left: 10px;
  transform: translate(-50%, -50%) rotate(-45deg) scale(1);
  width: 28px;
  height: 14px;
  border: 6px solid #34d399;
  border-top: none;
  border-right: none;
  opacity: 0;
  animation: tick-animation 0.5s ease-in-out forwards;
}

@keyframes tick-animation {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(-45deg) scale(0);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(-45deg) scale(1.2);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(-45deg) scale(1);
  }
}
</style>