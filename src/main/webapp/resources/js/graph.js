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

function printDotsOnGraph(xCenter, yCenter, rValue, isHit, size) {
    if (parseFloat(size) === parseFloat(rValue)) {
        ctx.fillStyle = isHit ? '#00ff00' : '#ff0000'
    } else {
        ctx.fillStyle = '#c0c0c0'
    }
    const scaledXCenter = xCenter / size;
    const scaledYCenter = yCenter / size;

    const x = w / 2 + scaledXCenter * hatchGap * 2;
    const y = h / 2 - scaledYCenter * hatchGap * 2;
    const radius = 3;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

function updateDotsOnGraphFromTable() {
    const rInput = document.querySelector('input[name="form:RValue"]:checked');
    const size = rInput ? rInput.value : 'R';
    const tableRows = document.querySelectorAll('.main__table tbody tr');

    // Перерисовываем график с текущим R
    redrawGraph(size);

    tableRows.forEach(row => {
        if (row.childNodes.length > 1) {
            const children = row.children;
            printDotsOnGraph(children[0].innerHTML, children[1].innerHTML, children[2].innerHTML, children[3].firstChild.classList.contains('hit'), size);
        }
    });
}

// Функции для работы с чекбоксами Y
function resetYCheckboxes() {
    const checkboxes = document.querySelectorAll('#yCheckboxes input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}

function setYCheckbox(yValue) {
    // Найти ближайшее допустимое значение Y
    const allowedYValues = [-5, -4, -3, -2, -1, 0, 1];
    let closestY = allowedYValues[0];
    let minDiff = Math.abs(yValue - closestY);

    for (let i = 1; i < allowedYValues.length; i++) {
        const diff = Math.abs(yValue - allowedYValues[i]);
        if (diff < minDiff) {
            minDiff = diff;
            closestY = allowedYValues[i];
        }
    }

    // Установить соответствующий чекбокс
    const checkboxId = getCheckboxIdForY(closestY);
    const checkbox = document.getElementById(checkboxId);
    if (checkbox) {
        checkbox.checked = true;
    }
}

function getCheckboxIdForY(yValue) {
    const yMap = {
        '-5': 'form:y_5',
        '-4': 'form:y_4',
        '-3': 'form:y_3',
        '-2': 'form:y_2',
        '-1': 'form:y_1',
        '0': 'form:y_0',
        '1': 'form:y1'
    };
    return yMap[yValue.toString()];
}

// Функция очистки графика
function clearGraph() {
    const rInput = document.querySelector('input[name="form:RValue"]:checked');
    const currentR = rInput ? rInput.value : 'R';
    redrawGraph(currentR);
}

canvas.addEventListener('click', (event) => {
    const rInput = document.querySelector('input[name="form:RValue"]:checked');
    const messages = document.getElementById('messagesC');

    if (rInput && rInput.value) {
        if (messages) messages.innerText = '';
        const canvasLeft = canvas.offsetLeft + canvas.clientLeft,
            canvasTop = canvas.offsetTop + canvas.clientTop;

        const x = event.pageX - canvasLeft,
            y = event.pageY - canvasTop;

        // Вычисление координат X и Y на основе масштаба
        let xCenter = (x - w / 2) / (hatchGap * (2 / rInput.value));
        let yCenter = (h / 2 - y) / (hatchGap * (2 / rInput.value));

        // Округление до тысячных
        xCenter = Math.round(xCenter * 1000) / 1000;
        yCenter = Math.round(yCenter * 1000) / 1000;

        // Обновить значения в форме
        const xInput = document.getElementById('form:XValue');
        if (xInput) xInput.value = xCenter;

        const sourceInput = document.getElementById('form:source');
        if (sourceInput) sourceInput.value = 'graph';

        // Сбросить все чекбоксы Y и установить только текущий Y
        resetYCheckboxes();
        setYCheckbox(yCenter);

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

    const triangle = x >= 0 && y >= 0 && y <= (r/2 - x/2);
    const circle = x <= 0 && y <= 0 && (x * x + y * y) <= (r * r / 4);
    const rectangle = x >= 0 && y <= 0 && x <= r && y >= (-r/2);

    return triangle || circle || rectangle;
}

document.addEventListener('DOMContentLoaded', function() {
    // Обработчик изменения R - мгновенная перерисовка графика
    const rInputs = document.querySelectorAll('input[name="form:RValue"]');
    rInputs.forEach(input => {
        input.addEventListener('change', function() {
            redrawGraph(this.value);
            updateDotsOnGraphFromTable();
        });
    });

    // Инициализация графика при загрузке
    updateDotsOnGraphFromTable();
});