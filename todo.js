// DOM selectors for theme function
const headContainer = document.getElementById('head-container')
const content = document.getElementById('content')
const h1 = document.querySelector('h1')
const container = document.getElementById('container')
const themeToggle = document.getElementById("themeToggle")

// DOM selectors for theme and other fuctions
const inputEl = document.querySelector('input')
const submitEl = document.querySelector('button')
const todosEl = document.querySelector('.todos')
const modalEl = document.querySelector('.modal')
const deleteAllEl = document.querySelector('.delete-all')
let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
let showDeleteButton = false

inputEl.focus();

if (tasks.length) {
    deleteAllEl.style.display = 'block'
    tasks.forEach(task => {
        let task_ = singleTask(task.id, task.task)        
        todosEl.innerHTML += task_
    })
}

function singleTask (index, task) {
    return `
    <p id="${index}" class="task">
        <span>${task}</span>
        <span class="delete" onclick="deleteTask(${index})" style="cursor:pointer">x</span>
    </p>
    `
}

const toggleModal = function() {
    if (tasks.length) {
        submitEl.disabled = true
        modalEl.style.display = 'block'
    }
}

function addTask () {
    if (modalEl.style.display === 'block') return
    if (tasks.length === 6) submitEl.style.background = '#f53636'    
    if (inputEl.value && inputEl.value.length && tasks.length <= 5) {
        let task = singleTask(tasks.length, inputEl.value)
        let todos = Array.from(todosEl.children)
        todosEl.innerHTML += task
        tasks.push({
            id: todos.length + 1,
            task: inputEl.value
        })
        
        localStorage.setItem('tasks', JSON.stringify(tasks))
        inputEl.value = ''
        deleteAllEl.style.display = 'block'
    } 
}

function deleteTask (taskId) {
    let todos = Array.from(todosEl.children)
    let taskToDelete = todos.filter(task => +task.id === taskId)[0]
    tasks = todos.filter(task => +task.id !== taskId)
    todosEl.removeChild(taskToDelete)
    let localStorageTasks = tasks.map(task => task.outerHTML)
    localStorage.setItem('tasks', JSON.stringify(localStorageTasks))
    if (!tasks.length) deleteAllEl.style.display = 'none'
    if (tasks.length === 5) submitEl.style.background = '#000'
}

function deleteAllTasks (boolean) {
    if (boolean) {
        todosEl.innerHTML = ''
        tasks = []
        localStorage.removeItem('tasks')
        deleteAllEl.style.display = 'none'
        submitEl.style.background = 'block'
    }
    modalEl.style.display = 'none'
    submitEl.disabled = false
}

submitEl.addEventListener('click', () => addTask)

inputEl.addEventListener('keydown', event => {
    if (event.key === 'Enter' && inputEl.value) addTask()
})

submitEl.addEventListener('mouseover', () => {
    if (tasks.length === 6) submitEl.style.cursor = 'not-allowed'
    else submitEl.style.cursor = 'pointer'
})

// for UI color change
let darkMode = false

function toggle() {
    if (!darkMode) {
        darkMode = true
        document.body.style.background = "rgb(23, 20, 47)"
        themeToggle.classList.add("dark")
        themeToggle.style.color = "blue" 
        headContainer.style.background = "blue"
        h1.style.color = 'white'
        submitEl.style.background = 'rgba(90, 88, 88, 1.000)'

        submitEl.addEventListener("mouseover", () => {
            submitEl.style.background = "hwb(240 18% 68% / 0.838)"
            submitEl.style.color = "white"
        })
        submitEl.addEventListener("mouseout", () => {
            submitEl.style.background = "rgba(90, 88, 88, 1.000)"
            submitEl.style.color = "white"
        })

        container.style.background = "rgba(50, 47, 47, 0.882)"
        container.style.color = "white"
        inputEl.style.borderBottom = "2px solid white"
        inputEl.style.color = "white"
        deleteAllEl.style.background = "rgba(90, 88, 88, 1.000)"

        deleteAllEl.addEventListener("mouseover", () => {
            deleteAllEl.style.background = 'rgb(149, 39, 39)'
            deleteAllEl.style.color = "white"
        })
        deleteAllEl.addEventListener("mouseout", () => {
            deleteAllEl.style.background = 'rgba(90, 88, 88, 1.000'
        })
        
        addedChildren = todosEl.children
        let added = Array.from(addedChildren)
        added.forEach((element) => {
            element.classList.add("list")
        })  

        modalEl.style.background = "rgba(56, 50, 48, 0.982)"
        
    } else {
        darkMode = false
        themeToggle.classList.remove("dark") 
        themeToggle.style.color = "black"

        document.body.style.background = "hwb(240 18% 68% / 0.838)"
        headContainer.style.background = "#000"
        h1.style.color = 'white'
        submitEl.style.background = '#000'

        submitEl.addEventListener("mouseover", () => {
            submitEl.style.background = " hsl(151, 74%, 60%)"
            submitEl.style.color = "white"
        })
        submitEl.addEventListener("mouseout", () => {
            submitEl.style.background = "#000"
            submitEl.style.color = "white"
        })

        container.style.background = "hsla(32, 12%, 79%, 0.758)"
        container.style.color = "black"
        inputEl.style.borderBottom = "2px solid black"
        inputEl.style.color = "black"
        deleteAllEl.style.background = "white"

        deleteAllEl.addEventListener("mouseover", () => {
            deleteAllEl.style.background = '#4ee49c'
            deleteAllEl.style.color = "black"
        })
        deleteAllEl.addEventListener("mouseout", () => {
            deleteAllEl.style.background = 'white'
        })
        
        addedChildren = todosEl.children
        let added = Array.from(addedChildren)
        added.forEach((element) => {
            element.classList.remove("list")
        })  

        modalEl.style.background = "#dbd5d5"
    }
}