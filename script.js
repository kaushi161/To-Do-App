const newTask = document.getElementById('newTask');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const filterBtns = document.querySelectorAll('.filters button');

let todos =[];


addBtn.addEventListener('click',() => {
    const text = newTask.value.trim();
    if(text !== ""){
        todos.push({text, done: false});
        newTask.value ="";
        renderList();
    }
});

function renderList(filter = 'all'){
    todoList.innerHTML ="";
     todos
     .filter(todo => {
        if(filter === 'done') return todo.done;
        if(filter === 'not-done') return  !todo.done;
    return true;
    })
    .forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = todo.done ? 'done':'';

        const span = document.createElement('span');
        span.textContent = todo.text;
        span.style.cursor = 'pointer';
        span.onclick = () => {
            todos[index].done = !todos[index].done;
            renderList(currentFilter);
        };
        const del = document.createElement('button');
        del.textContent = 'X';
        del.onclick = () => {
            todos.splice(index,1);
            renderList(currentFilter);
        };

        li.appendChild(span);
        li.appendChild(del);
        todoList.appendChild(li);
    });
}

let currentFilter = 'all';
 filterBtns.forEach(btn => {
    btn.addEventListener('click',() => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderList(currentFilter);
    });
 });

 renderList();

