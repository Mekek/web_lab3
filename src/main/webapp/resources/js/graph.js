const canvas = document.getElementById("graph"),
    ctx = canvas.getContext('2d');

canvas.width = 300
canvas.height = 300
let w = canvas.width,
    h = canvas.height;

const hatchWidth = 20 / 2;
const hatchGap = 56;

function redrawGraph(r) {
    ctx.clearRect(0, 0, w, h);

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';

    // y axis
    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2 - 10, 15);
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2 + 10, 15);
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.stroke();
    ctx.closePath();

    // x axis
    ctx.beginPath();
    ctx.moveTo(w, h / 2);
    ctx.lineTo(w - 15, h / 2 - 10);
    ctx.moveTo(w, h / 2);
    ctx.lineTo(w - 15, h / 2 + 10);
    ctx.moveTo(w, h / 2);
    ctx.lineTo(0, h / 2);
    ctx.stroke();
    ctx.closePath();

    // hatches
    ctx.beginPath();
    ctx.moveTo(w / 2 - hatchWidth, h / 2 - hatchGap);
    ctx.lineTo(w / 2 + hatchWidth, h / 2 - hatchGap);
    ctx.moveTo(w / 2 - hatchWidth, h / 2 - hatchGap * 2);
    ctx.lineTo(w / 2 + hatchWidth, h / 2 - hatchGap * 2);
    ctx.moveTo(w / 2 - hatchWidth, h / 2 + hatchGap);
    ctx.lineTo(w / 2 + hatchWidth, h / 2 + hatchGap);
    ctx.moveTo(w / 2 - hatchWidth, h / 2 + hatchGap * 2);
    ctx.lineTo(w / 2 + hatchWidth, h / 2 + hatchGap * 2);
    ctx.moveTo(w / 2 - hatchGap, h / 2 - hatchWidth);
    ctx.lineTo(w / 2 - hatchGap, h / 2 + hatchWidth);
    ctx.moveTo(w / 2 - hatchGap * 2, h / 2 - hatchWidth);
    ctx.lineTo(w / 2 - hatchGap * 2, h / 2 + hatchWidth);
    ctx.moveTo(w / 2 + hatchGap, h / 2 - hatchWidth);
    ctx.lineTo(w / 2 + hatchGap, h / 2 + hatchWidth);
    ctx.moveTo(w / 2 + hatchGap * 2, h / 2 - hatchWidth);
    ctx.lineTo(w / 2 + hatchGap * 2, h / 2 + hatchWidth);
    ctx.stroke();
    ctx.closePath();

    // main figure
    ctx.fillStyle = '#236BF155';
    ctx.beginPath();
    ctx.moveTo(w/2 + hatchGap * 2, h/2);
    ctx.lineTo(w/2 + hatchGap * 2, h/2);
    ctx.lineTo(w/2 + hatchGap * 2, h/2 + hatchGap);
    ctx.lineTo(w/2, h/2 + hatchGap);
    ctx.lineTo(w/2, h/2);
    // correct
    ctx.lineTo(w/2, h/2 + hatchGap)
    ctx.arc(w/2, h/2, hatchGap, Math.PI * 0.5, Math.PI, false);
    ctx.lineTo(w/2 - hatchGap, h/2);
    ctx.lineTo(w/2, h/2);
    ctx.lineTo(w/2, h/2 - hatchGap);
    ctx.lineTo(w/2 + hatchGap * 2, h/2);
    ctx.lineTo(w/2, h/2);

    ctx.fill();
    ctx.strokeStyle = '#3E23F1'
    ctx.stroke();
    ctx.closePath();

    const fontSize = hatchGap / 3.5
    ctx.fillStyle = 'black'

    ctx.font = `${fontSize * 1.4}px "Arial", serif`;
    ctx.fillText('y', w / 2 - hatchWidth * 2.8, 15)
    ctx.fillText('x', w - 20, h / 2 - hatchWidth * 2.4)

    let label1, label2;
    if (isNaN(r) || r === 'R') {
        label1 = 'R/2'
        label2 = 'R'
    } else {
        label1 = (r / 2).toFixed(1);
        label2 = r.toString();
    }

    ctx.font = `${fontSize}px "Arial", serif`;
    ctx.fillText(label1, w / 2 + hatchGap - 3, h / 2 + hatchWidth * 2.8);
    ctx.fillText(label2, w / 2 + hatchGap * 2 - 3, h / 2 + hatchWidth * 2.8);
    ctx.fillText('-' + label1, w / 2 - hatchGap - 7, h / 2 + hatchWidth * 2.8);
    ctx.fillText('-' + label2, w / 2 - hatchGap * 2 - 7, h / 2 + hatchWidth * 2.8);

    ctx.fillText(label1, w / 2 + hatchWidth * 2, h / 2 - hatchGap + 3);
    ctx.fillText(label2, w / 2 + hatchWidth * 2, h / 2 - hatchGap * 2 + 3);
    ctx.fillText('-' + label1, w / 2 + hatchWidth * 2, h / 2 + hatchGap + 3);
    ctx.fillText('-' + label2, w / 2 + hatchWidth * 2, h / 2 + hatchGap * 2 + 3);
}

// Инициализация графика при загрузке
redrawGraph('R');

function printDotsOnGraph(xCenter, yCenter, rValue, originalHit, currentR) {
    // Вычисляем текущий статус точки относительно текущего R
    const currentHit = isPointInArea(xCenter, yCenter, currentR);

    // Определяем цвет точки по новой схеме:
    let color;
    if (originalHit && currentHit) {
        // Зеленый: точка попадает при текущем R и попадала при своем R
        color = '#00ff00';
    } else if (!originalHit && !currentHit) {
        // Красный: точка не попадает при текущем R и не попадала при своем R
        color = '#ff0000';
    } else if (!originalHit && currentHit) {
        // Оранжевый: точка раньше не попадала, но после изменения R стала попадать
        color = '#ffa500';
    } else { // originalHit && !currentHit
        // Фиолетовый: точка раньше попадала, но после изменения R перестала попадать
        color = '#800080';
    }

    ctx.fillStyle = color;

    // Масштабируем координаты относительно ТЕКУЩЕГО R (currentR)
    const scaleFactor = hatchGap * 2 / currentR;

    const x = w / 2 + xCenter * scaleFactor;
    const y = h / 2 - yCenter * scaleFactor;

    const radius = 4;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    // Добавляем обводку для лучшей видимости
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.stroke();
}

function updateDotsOnGraphFromTable() {
    try {
        const rInput = document.querySelector('input[name="form:RValue"]:checked');
        const currentR = rInput ? parseFloat(rInput.value) : 'R';
        const tableRows = document.querySelectorAll('.main__table tbody tr');

        // Перерисовываем график с текущим R
        redrawGraph(currentR);

        // Если R не выбран, не рисуем точки
        if (currentR === 'R') return;

        tableRows.forEach(row => {
            if (row.childNodes.length > 1 && row.children.length >= 4) {
                const children = row.children;
                try {
                    // Получаем оригинальный статус попадания из таблицы
                    const originalHit = children[3].querySelector('span')?.className?.includes('hit') || false;

                    printDotsOnGraph(
                        parseFloat(children[0].textContent || children[0].innerText),  // X
                        parseFloat(children[1].textContent || children[1].innerText),  // Y
                        parseFloat(children[2].textContent || children[2].innerText),  // R точки
                        originalHit,  // Оригинальный статус попадания
                        currentR  // Текущий R для масштабирования и определения цвета
                    );
                } catch (e) {
                    console.warn('Error parsing row data:', e);
                }
            }
        });
    } catch (error) {
        console.error('Error updating graph dots:', error);
    }
}

// Функция для установки произвольного значения Y
function setYValue(yValue) {
    // Округление до тысячных
    yValue = Math.round(yValue * 1000) / 1000;

    // Создаем скрытое поле для Y если его нет
    let yHiddenInput = document.getElementById('yHiddenInput');
    if (!yHiddenInput) {
        yHiddenInput = document.createElement('input');
        yHiddenInput.type = 'hidden';
        yHiddenInput.id = 'yHiddenInput';
        yHiddenInput.name = 'yHiddenInput';
        document.getElementById('form').appendChild(yHiddenInput);
    }
    yHiddenInput.value = yValue;

    // Также устанавливаем source в 'graph'
    const sourceInput = document.getElementById('form:source');
    if (sourceInput) sourceInput.value = 'graph';
}

// Функция для сброса source обратно в 'form' после отправки
function resetFormSource() {
    const sourceInput = document.getElementById('form:source');
    if (sourceInput) sourceInput.value = 'form';
}

// Функция для очистки всех чекбоксов Y
function clearYCheckboxes() {
    const checkboxes = document.querySelectorAll('#yCheckboxes input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}

// Функция очистки графика
function clearGraph() {
    const rInput = document.querySelector('input[name="form:RValue"]:checked');
    const currentR = rInput ? rInput.value : 'R';
    redrawGraph(currentR);
}

// Обработчик клика по графику
canvas.addEventListener('click', (event) => {
    const rInput = document.querySelector('input[name="form:RValue"]:checked');
    const messages = document.getElementById('messagesC');

    if (rInput && rInput.value) {
        if (messages) messages.innerText = '';
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const currentR = parseFloat(rInput.value);

        // Вычисление координат X и Y на основе текущего R
        let xCenter = (x - w / 2) / (hatchGap * (2 / currentR));
        let yCenter = (h / 2 - y) / (hatchGap * (2 / currentR));

        // Округление до тысячных
        xCenter = Math.round(xCenter * 1000) / 1000;
        yCenter = Math.round(yCenter * 1000) / 1000;

        // Обновить значения в форме
        const xInput = document.getElementById('form:XValue');
        if (xInput) xInput.value = xCenter;

        // ОЧИСТИТЬ ВСЕ ЧЕКБОКСЫ Y при клике по графику
        clearYCheckboxes();

        // Установить произвольное значение Y
        setYValue(yCenter);

        // Убираем сообщение об ошибке Y, так как мы установили значение через график
        clearYError();

        // Программно нажать кнопку Submit для отправки данных
        const submitBtn = document.getElementById('form:submitBtn');
        if (submitBtn) {
            submitBtn.click();
        }

    } else {
        if (messages) messages.innerText = "The R field cannot be empty!";
    }
});

function isPointInArea(x, y, r) {
    x = parseFloat(x);
    y = parseFloat(y);
    r = parseFloat(r);

    // Треугольник (первая четверть): x >= 0, y >= 0, y <= (r/2 - x/2)
    const triangle = x >= 0 && y >= 0 && y <= (r/2 - x/2);

    // Круг (третья четверть): x <= 0, y <= 0, x² + y² <= (r/2)²
    const circle = x <= 0 && y <= 0 && (x * x + y * y) <= (r * r / 4);

    // Прямоугольник (четвертая четверть): x >= 0, y <= 0, x <= r, y >= -r/2
    const rectangle = x >= 0 && y <= 0 && x <= r && y >= (-r/2);

    return triangle || circle || rectangle;
}

// Обработчик изменения R (для событий от PrimeFaces)
function handleRChangeEvent() {
    const rInput = document.querySelector('input[name="form:RValue"]:checked');
    if (rInput) {
        redrawGraph(rInput.value);
        updateDotsOnGraphFromTable();
    }
}

// Обработчик изменения R (для нативных событий)
function setupRChangeListener() {
    const rInputs = document.querySelectorAll('input[name="form:RValue"]');

    rInputs.forEach(input => {
        // Удаляем старые обработчики
        input.removeEventListener('change', handleNativeRChange);
        // Добавляем новые обработчики
        input.addEventListener('change', handleNativeRChange);
    });
}

function handleNativeRChange() {
    redrawGraph(this.value);
    updateDotsOnGraphFromTable();
}

// Функция для принудительного обновления графика после AJAX
function refreshGraphAfterAjax() {
    setTimeout(() => {
        setupRChangeListener();
        updateDotsOnGraphFromTable();
    }, 300);
}

// Функция для показа ошибки Y
function showYError() {
    const messages = document.getElementById('messagesC');
    if (messages) {
        messages.innerHTML = '<div class="ui-message-error">Please select at least one Y value!</div>';
    }
}

// Функция для очистки ошибки Y
function clearYError() {
    const messages = document.getElementById('messagesC');
    if (messages) {
        messages.innerHTML = '';
    }
}

// Функция, вызываемая после завершения Submit
function handleSubmitComplete() {
    // Всегда обновляем график после Submit
    refreshGraphAfterAjax();
    resetFormSource();
}

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация обработчиков изменения R
    setupRChangeListener();

    // Инициализация графика при загрузке
    updateDotsOnGraphFromTable();
});