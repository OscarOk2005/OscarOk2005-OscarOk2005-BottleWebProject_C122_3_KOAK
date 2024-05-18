// функция создания пустой матрицы заданной размерности
function createMatrix() {
    const size = document.getElementById('matrix_size').value;  // получение введенной размерности матрицы
    if (Number.isInteger(Number.parseInt(size))) {  // проверка: является ли размерность целым числом
        if (Number.parseInt(size) > 2 && Number.parseInt(size) < 11) {  // проверка: попадает ли число в диапазон от 3 до 10
            const container = document.getElementById('matrixContainer');  // получение контейнера для ввода матрицы
            container.innerHTML = '';  // очистка контейнера от всех элементов

            const table = document.createElement('table');  // создание таблицы для ввода матрицы
            table.classList.add('table', 'table-bordered');  // добавление классов для таблицы

            const thead = document.createElement('thead');  // создание элемента для группировки содержимого заголовка
            const headerRow = document.createElement('tr');  // создание заголовочной строки

            const emptyCell = document.createElement('th');  // создание ячейки для заголовочной строки
            headerRow.appendChild(emptyCell);  // добавление ячейки в строку с заголовками

            for (let j = 1; j <= size; j++) {  
                const headerCell = document.createElement('th');  // создание ячейки заголовка
                headerCell.textContent = j;  // запись номера вершины в созданную ячейку
                headerRow.appendChild(headerCell);  // добавление созданной ячейки в заголовочную строку
            }
            thead.appendChild(headerRow);  // добавление заголовочной строки в элемент группировки
            table.appendChild(thead);  // добавление всех заголовоков в таблицу

            const tbody = document.createElement('tbody');  // создание объекта тела таблицы

            for (let i = 0; i < size; i++) {
                const row = document.createElement('tr');  // создание новой строки

                const rowNumberCell = document.createElement('th');  // создание ячейки
                rowNumberCell.textContent = i + 1;  // запись в созданную ячейку номера вершины
                row.appendChild(rowNumberCell);  // добавление ячейки в строку

                for (let j = 0; j < size; j++) {
                    const cell = document.createElement('td');  // создание ячейки
                    const input = document.createElement('input');  // создание поля для ввода веса ребра
                    input.type = 'number';  //  указание, что поле ввода будет числового типа
                    // удаляем возможность ввести минус в поле ввода
                    input.onkeydown = function (event) {
                        return event.key !== '-';
                    };

                    // добавление атрибутов полю ввода
                    input.classList.add('form-control');
                    input.classList.add('matrix-input');
                    input.name = `matrix[${i}][${j}]`;
                    input.id = `matrix[${i}][${j}]`;

                    cell.appendChild(input);  // добавление поля ввода в ячейку таблицы
                    row.appendChild(cell);  // добавление ячейки в строку
                }

                tbody.appendChild(row);  // добавление строки в теле таблицы
            }

            table.appendChild(tbody);  // добавление тела в таблицу
            container.appendChild(table);  // добавление таблицы в контейнер

            const submitButton = document.createElement('button');  // объявление кнопки для перехода к решению
            // добавление атрибутов кнопке
            submitButton.type = 'submit';
            submitButton.classList.add('btn', 'btn-primary', 'mt-3');
            submitButton.textContent = 'Рассчитать';
            submitButton.onclick = checkMatrix;

            container.appendChild(submitButton);  // добавление кнопки в контейнер
        }
        else {
            alert("Ошибка");
        }
    }
    else {
        alert("Ошибка");
    }
}

// функция для проверки ввода
function checkMatrix() {
    const size = Number.parseInt(document.getElementById('matrix_size').value);  // получение размерности матрицы
    let sum = 0;  // объявление переменной для хранения суммы значений ячеек строки
    for (let i = 0; i < size; i++) {
        sum = 0;  // обнуление суммы
        for (let j = 0; j < size; j++) {
            sum += Number.parseInt(document.getElementById(`matrix[${i}][${j}]`).value);  // добавление значения ячейки к сумме
            // проверка на то, что матрица симметрична
            let cell1 = document.getElementById(`matrix[${i}][${j}]`).value;
            let cell2 = document.getElementById(`matrix[${j}][${i}]`).value;
            if (cell1 != "" && cell2!="") {
                if (Number.parseInt(cell1) != Number.parseInt(cell2)) {
                    alert("Ошибка 1");
                    return false;
                }
            }
            // проверка на то, что значения по диагонали равны не нулю
            else if (Number.parseInt(document.getElementById(`matrix[${i}][${i}]`).value) != 0){
                alert("Ошибка 2");
                return false;
            }
        }
        // проверка на то, что все ячейки в строке равны нулю
        if (sum == 0) {
            alert("Ошибка 3");
            return false;
        }
    }
    // проверка существования поля ввода стартовой позиции
    if (document.getElementById('start_point') != null) {
        const startPointId = Number.parseInt(document.getElementById('start_point').value);  // получение значения стартовой позиции
        // обработка ситуации, когда стартовая позиция больше количества вершин
        if (startPointId > size) {
            alert('Ошибка 4');
            return false;
        }
    }
}