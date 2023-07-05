<template>
  <div>
      <li
          class="w-[78vw] md:w-[68vw] lg:w-[48vw] px-4 py-2 bg-indigo-200 rounded-xl flex justify-between shadow-xl hover:shadow-2xl ease-in hover:scale-x-105 transition-all duration-100">
          <input type="checkbox" 
          :checked="todo.isCompleted" 
          class="custom-checkbox" 
          :id="`todo-checkbox-${todo.id}`"
          @input="$emit('toggleCompleted', index)" />
          <label :for="`todo-checkbox-${todo.id}`"></label>
          <div class="todo">
              <input v-if="todo.isEditing" type="text" :value="todo.todo" class="max-w-[50vw] md:max-w-[48vw] lg:max-w-[38vw] h-fit overflow-hidden px-2 bg-indigo-100 hover:border-3 rounded-xl text-2xl font-semibold font-serif text-center border-2 border-indigo-800 transition-all ease-in duration-200" @input="$emit('updateTodo', $event.target.value, index)">
              <div v-else class="text-center text-2xl max-w-[50vw] md:max-w-[48vw] lg:max-w-[38vw] overflow-hidden font-semibold font-serif" :class="{ 'line-through cursor-not-allowed': todo.isCompleted}">{{ todo.todo }}</div>
          </div>
          <div class="todoActions flex gap-1">
              <i v-if="todo.isEditing"
                  class="hover:drop-shadow-lg hover:scale-105 transition-all ease-in duration-300 text-2xl md:text-3xl fas fa-save text-green-500"
                  @click="$emit('toggleEdit', index)"></i>
              <!-- <i v-if="todo.isCompleted"
                  class="hover:drop-shadow-lg hover:scale-105 transition-all ease-in duration-200 text-2xl fas fa-times-circle text-red-500"></i> -->
              <i v-else
                  class="hover:drop-shadow-lg hover:scale-105 transition-all ease-in duration-200 text-2xl md:text-3xl fas fa-edit text-green-500"
                  @click="$emit('toggleEdit', index)"></i>
              <i
                  class="hover:drop-shadow-lg hover:scale-105 transition-all ease-in duration-200 text-2xl md:text-3xl fas fa-trash-alt text-red-500"
                  @click="$emit('deleteTodo', todo.id)"></i>


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
      index: {
          type: Number,
          required: true,
      }
  },
}
</script>

<script setup> defineEmits(['toggleCompleted', 'toggleEdit', 'updateTodo', 'deleteTodo']) </script>

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