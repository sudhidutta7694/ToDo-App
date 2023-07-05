<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="p-20 flex flex-col gap-6 items-center relative">
        <p class="text-4xl md:text-5xl font-serif font-bold text-indigo-700">Create ToDo</p>
        <ToDoCreator @create-Todo="createTodo" />
        <ul class="flex flex-col gap-4 items-center justify-center">
            <ToDoItem v-for="(todo, index) in todoList" :todo="todo" :index="index" @toggleCompleted="toggleCompleted"
                @toggleEdit="toggleEditing" @updateTodo="updateTodo" @deleteTodo="confirmDelete" :key="todo.id" />
        </ul>
        <p class="text-xl text-center italic font-serif drop-shadow-xl shadow-indigo-400 font-light text-indigo-700"
            v-if="!(todoList.length > 0)">
            There are no Todos available as of now 😌
        </p>
        <div>
            <div v-if="showCompletedPopup" class="completed-popup " @click="hideCompletedPopup">
                <div class="completed-popup-content">
                    <img src="https://i.pinimg.com/originals/d3/c6/8a/d3c68aeb6f9ead3e57f80f12d12304b8.gif"
                        alt="Completed" />
                    <p class="completed-popup-text">You have completed all your tasks!</p>
                </div>
            </div>
        </div>
        <!-- Delete Confirmation Popup -->
        <div v-if="showDeletePopup" class="fixed inset-0 flex items-center justify-center z-50000">
            <div class="fixed inset-0 bg-gray-800 bg-opacity-70 z-40000"></div>
            <div
                class="font-serif bg-indigo-50 border border-red-600 flex flex-col items-center justify-center rounded-xl p-6 max-w-md relative z-50000">
                <button @click="closeDeletePopup">
                    <i
                        class="absolute top-0 right-1 hover:scale-105 ease-in transition-all duration-100 text-2xl text-red-500 fas fa-times-circle"></i>
                </button>
                <div class="mb-4 bg-indigo-100 py-2 px-3 rounded-full shadow-xl hover:drop-shadow-xl">
                    <i class="fas fa-trash-alt text-red-500 text-2xl"></i>
                </div>
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold">Are you sure to delete this ToDo?</h2>
                </div>
                <p class="mb-1 text-center overflow-hidden"><span class="font-bold">ToDo ID:</span> {{ todoToDelete.id }}
                </p>
                <p class="mb-4 text-center overflow-hidden"><span class="font-bold">ToDo Value:</span> {{ todoToDelete.todo
                }}</p>
                <div class="flex justify-end">
                    <button
                        class="mr-2 px-4 py-2 text-lg font-serif text-white bg-green-500 rounded-lg transition-all hover:scale-105 duration-300 hover:bg-green-600"
                        @click="confirmDeleteTodo">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { db } from "../firebase/firebase"
import { doc, setDoc, updateDoc,  deleteDoc, collection, onSnapshot } from "firebase/firestore"
import { ref, watch, computed, onMounted } from "vue";
// import { uid } from "uid";
import ToDoCreator from "../components/ToDoCreator.vue";
import ToDoItem from "../components/ToDoItem.vue";

export default {
    components: {
        ToDoCreator,
        ToDoItem,
    },
    setup() {
        const todoList = ref([]);
        const showDeletePopup = ref(false);
        const todoToDelete = ref(null);
        const showCompletedPopup = ref(false);
        // const todoRef = collection(db, 'Todos')


        watch(todoList, () => {
            setTodoLocalStorage();
        }, {
            deep: true,
        });

        const createTodo = async (todo) => {
            const id = new Date().getTime().toString();
            const newTodo = {
                id,
                todo,
                isCompleted: false,
                isEditing: false,
            };

            try {
                const docRef = doc(db, "Todos", id);
                await setDoc(docRef, newTodo);
                todoList.value.push({ ...newTodo, docRef });
                setTodoLocalStorage();
            } catch (error) {
                console.error('Error creating todo:', error);
            }
        };

        
        const getTodo = () => {
            try {
                onSnapshot(collection(db, "Todos"), snapshot => {
                    const todos = [];
                    snapshot.forEach((doc) => {
                        todos.push({ id: doc.id, ...doc.data() }); //Destructuring the snapshot
                    });
                    todoList.value = todos;
                })
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };
        
        onMounted (getTodo)

        const setTodoLocalStorage = () => {
            localStorage.setItem("todoList", JSON.stringify(todoList.value));
        };

        const todoCompleted = computed(() => {
            return todoList.value.every((todo) => todo.isCompleted);
        });

        const toggleCompleted = async (todoPos) => {
            const todo = todoList.value[todoPos]
            const todoRef = doc(db, "Todos", todo.id)

            try {
                await updateDoc(todoRef, {
                    isCompleted: !todo.isCompleted,
                })
                todoList.value[todoPos].isCompleted = !todoList.value[todoPos].isCompleted;
            } catch (error) {
                console.error('Error updating todo completion status:', error);
            }
            if (todoCompleted.value) {
                showCompletedPopup.value = true;
                setTimeout(() => {
                    showCompletedPopup.value = false;
                }, 3000);
            }
        };

        const toggleEditing = async (todoPos) => {
            const todo = todoList.value[todoPos]
            const todoRef = doc(db, "Todos", todo.id)

            try {
                await updateDoc(todoRef, {
                    isEditing: !todo.isEditing,
                })
                todoList.value[todoPos].isEditing = !todoList.value[todoPos].isEditing;
            } catch (error) {
                console.error('Error updating todo:', error);
            }
        };

        const updateTodo = async (todoVal, todoPos) => {
            const todo = todoList.value[todoPos];
            const todoRef = doc(db, "Todos", todo.id);

            try {
                await updateDoc(todoRef, {
                    todo: todoVal,
                });

                todoList.value[todoPos].todo = todoVal;
            } catch (error) {
                console.error("Error updating todo:", error);
            }
        };

        const confirmDelete = (todoID) => {
            showDeletePopup.value = true;
            todoToDelete.value = todoList.value.find((todo) => todo.id === todoID);
        };

        const confirmDeleteTodo = async () => {
            const todoIdToDelete = todoToDelete.value.id;

            // Delete the todo
            await deleteDoc(doc(db, "Todos", todoIdToDelete));

            // Remove the todo from the todoList
            const updatedTodoList = todoList.value.filter((todo) => todo.id.toString() !== todoIdToDelete);
            todoList.value = updatedTodoList;

            // Close the delete popup
            closeDeletePopup();
        };


        const closeDeletePopup = () => {
            showDeletePopup.value = false;
            todoToDelete.value = null;
        };

        const hideCompletedPopup = () => {
            showCompletedPopup.value = false;
        };

        return {
            todoList,
            showDeletePopup,
            todoToDelete,
            showCompletedPopup,
            createTodo,
            toggleCompleted,
            toggleEditing,
            updateTodo,
            confirmDelete,
            confirmDeleteTodo,
            closeDeletePopup,
            hideCompletedPopup,
        };
    },
};
</script>
  

<style lang="scss" scoped>
body.blur {
    filter: blur(8px);
    /* Adjust the blur intensity as needed */
}

input::placeholder {
    /* Custom placeholder styles */
    color: black;
    font-style: italic;
    font-size: large;
    font-weight: bold;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

@keyframes burstAnimation {
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(2);
        opacity: 0;
    }
}

.is-deleted {
    animation: burstAnimation 1s ease-in-out forwards;
}

.completed-popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 300px;
    background-color: rgba(79, 70, 229, 1);
    backdrop-filter: blur(0px);
    border-radius: 12px;
    z-index: 1000;
    pointer-events: none;
}

.completed-popup-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.completed-popup-text {
    color: white;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
}

.completed-popup img {
    width: 150px;
    height: 150px;
}

/* Blur effect */
</style>
  