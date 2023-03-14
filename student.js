function decryptTask(encryptedTask) {
    return atob(encryptedTask); // преобразование base64-строки в исходную задачу
}
  
function decryptAndDisplay() {
const encryptedTaskInput = document.getElementById("encryptedTaskInput");
const encryptedTask = encryptedTaskInput.value;
const decryptedTask = decryptTask(encryptedTask);
const decryptedTaskList = decryptedTask.split(',')

const taskList = document.getElementById("taskList")
taskList.innerHTML = ''
decryptedTaskList.forEach(function(task){
  const li = document.createElement("li")
  li.classList.add("list-group-item", "text-center")
  li.textContent = task
  katex.render(task, li)
  taskList.appendChild(li)
})
}