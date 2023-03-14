// IDcomplexity - переменная, определяющая сложность (уровень вложенности)
// IDvariant - переменная, определяющая вариант (от нее зависит, какие функции выбираются)

// F1 - Унарная функция
// F2 - Бинарная функция

function randomFromTo(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

function F1(IDcomplexity,IDvariant){
    if(IDcomplexity > 0){
        let k = String(IDvariant)[IDcomplexity-1]
        if(k === '0'){
            return '\\sin{'+F1(IDcomplexity-1,IDvariant)+'}'
        }
        if(k === '1'){
            return '\\cos{'+F1(IDcomplexity-1,IDvariant)+'}'
        }
        if(k === '2'){
            return '\\sqrt['+String(randomFromTo(2,9))+']{'+F1(IDcomplexity-1,IDvariant)+'}'
        }
        if(k === '3'){
            return '\\sqrt{'+F1(IDcomplexity-1,IDvariant)+'}'
        }
        if(k === '4'){
            return 'e^{'+F1(IDcomplexity-1,IDvariant)+'}'
        }
        if(k === '5'){
            return String(randomFromTo(2,9))+'^{'+F1(IDcomplexity-1,IDvariant)+'}'
        }
        if(k === '6'){
            return '\\left ('+F1(IDcomplexity-1,IDvariant)+'\\right )^'+String(randomFromTo(2,9))
        }
        if(k === '7'){
          return String(randomFromTo(2,9))+F1(IDcomplexity-1,IDvariant) 
        }
        if(k === '8'){
          return String(randomFromTo(2,9))+F1(IDcomplexity-1,IDvariant) 
        }
        if(k === '9'){
          return String(randomFromTo(2,9))+F1(IDcomplexity-1,IDvariant) 
        }
    }
    else if(IDcomplexity === 0){
        return 'x'
    }
}

function F2(IDcomplexity,IDvariant){
    let IDvariant2 = Number(String(IDvariant).slice(2)+ String(IDvariant).slice(0,2))
    if(IDcomplexity > 1){
      k=String(IDvariant)[IDcomplexity-1]
      if(k == '0'){
        return F1(IDcomplexity-1,IDvariant)+'+'+F1(IDcomplexity-1,IDvariant2)
      }
      if(k == '1'){
        return F1(IDcomplexity-1,IDvariant)+'+'+F1(IDcomplexity-1,IDvariant2)
      }
      if(k == '2'){
        return '\\frac{'+F1(IDcomplexity-1,IDvariant)+'}{'+F1(IDcomplexity-1,IDvariant2)+'}'
      }
      if(k == '3'){
        return '\\frac{'+F1(IDcomplexity-1,IDvariant)+'}{'+F1(IDcomplexity-1,IDvariant2)+'}'
      }
      if(k == '4'){
        return '\\frac{'+F1(IDcomplexity-1,IDvariant)+'}{'+F1(IDcomplexity-1,IDvariant2)+'}'
      }
      if(k == '5'){
        return F1(IDcomplexity-1,IDvariant)+'\\cdot'+F1(IDcomplexity-1,IDvariant2)
      }
      if(k == '6'){
        return F1(IDcomplexity-1,IDvariant)+'\\cdot'+F1(IDcomplexity-1,IDvariant2)
      }
      if(k == '7'){
        return F1(IDcomplexity-1,IDvariant)+'\\cdot'+F1(IDcomplexity-1,IDvariant2)
      }
      if(k == '8'){
        return F1(IDcomplexity-1,IDvariant)+'-'+F1(IDcomplexity-1,IDvariant2)
      }
      if(k == '9'){
        return F1(IDcomplexity-1,IDvariant)+'-'+F1(IDcomplexity-1,IDvariant2)
      }
    }
}

function generateF1(complexity){
  let IDvariant = ''
  for(let i=0; i < complexity; i++){
    IDvariant += String(randomFromTo(0,9))
  }
  return F1(complexity, IDvariant)
}

function generateF2(complexity){
  let IDvariant = ''
  for(let i=0; i < complexity; i++){
    IDvariant += String(randomFromTo(0,9))
  }
  if(complexity == 1){
    complexity = 2
    IDvariant = String(randomFromTo(0,9))
    IDvariant += String(randomFromTo(0,9))
  }
  return F2(complexity, IDvariant)
}

// Генерация задач

var f = 0

function generateAndDisplayF1(){
  const TaskOutputP = document.getElementById("taskOutputP");
  const TaskOutput = document.getElementById("taskOutput");
  const TaskDifficultyInput = document.getElementById("taskDifficulty");
  const TaskDifficulty = TaskDifficultyInput.value;
  const Task = generateF1(TaskDifficulty)
  katex.render(Task, TaskOutputP)
  TaskOutput.value = Task
  f = 1
}

function generateAndDisplayF2(){
  const TaskOutputP = document.getElementById("taskOutputP");
  const TaskOutput = document.getElementById("taskOutput");
  const TaskDifficultyInput = document.getElementById("taskDifficulty");
  const TaskDifficulty = TaskDifficultyInput.value;
  const Task = generateF2(TaskDifficulty)
  katex.render(Task, TaskOutputP)
  TaskOutput.value = Task
  f = 2
}

function refreshF(){
  if(f === 1){
    generateAndDisplayF1()
  }
  if(f === 2){
    generateAndDisplayF2()
  }
}

// Список добавленных задач

var generatedTaskList = []

function addIntoTaskList(){
  var taskValue = document.getElementById("taskOutput").value
  if(taskValue != ''){
    generatedTaskList.push(taskValue)

    const taskList = document.getElementById("taskList")
    const taskText = document.getElementById("taskText")
    taskList.innerHTML = ''
    taskText.innerText = 'Список'
    generatedTaskList.forEach(function(task){
      const li = document.createElement("li")
      li.classList.add("list-group-item", "text-center")
      li.textContent = task
      katex.render(task, li)
      taskList.appendChild(li)
    })
  }
}

// Вывод добавленных задач на HTML-страницу

function clearTaskList(){
  const taskList = document.getElementById("taskList")
  const taskText = document.getElementById("taskText")
  taskList.innerHTML = ''
  taskText.innerText = ''
  generatedTaskList = []
}

// Шифрование

function encryptTask() {
  let encryptedTask = btoa(generatedTaskList); // преобразование задачи в base64-строку
  const encryptedTaskInput = document.getElementById("encryptedTask")
  const copyTextButton = document.getElementById("copyTextButton")
  copyTextButton.innerText = "Скопировать"
  encryptedTaskInput.value = encryptedTask
}

// Копирование текста

function copyText(){
  const encryptedTaskInput = document.getElementById("encryptedTask")
  const copyTextButton = document.getElementById("copyTextButton")
  encryptedTaskInput.disabled = false
  encryptedTaskInput.select()
  encryptedTaskInput.disabled = true
  document.execCommand("copy");
  copyTextButton.innerText = "Скопировано!"
}