window.addEventListener('load', function () {
    console.log('Window loaded, initializing form values...');
    // Инициализация значений X и R
    const xInput = document.getElementById('form:X');
    const xSpan = document.getElementById('form:XValue');
    const rInput = document.getElementById('form:R');
    const rSpan = document.getElementById('form:RValue');
    const messages = document.getElementById('messagesC');

    // Инициализация значений по умолчанию
    xSpan.value = '0';
    xInput.value = xSpan.value;
    console.log('Initial X value set to: ', xSpan.value);

    if (xInput.value !== null) {
        xValid = true;
        console.log('X input is valid');
    }

    rSpan.value = '2.5';
    rInput.value = rSpan.value;
    console.log('Initial R value set to: ', rSpan.value);

    if (rInput.value !== null) {
        redrawGraph(rInput.value);
        updateDotsOnGraphFromTable();
        rValid = true;
        console.log('R input is valid, graph updated');
    }

    // toggleSubmitBtn();  // Проверяем, можно ли отправить форму
    console.log('Form submission button state: ', submitBtn.disabled);
});

// Обработчик для X (p:spinner)
let xValid = false;
let yValid = false;
let rValid = false;

const xInput = document.getElementById('form:XValue');
const xSpan = document.getElementById('form:XValue');
const rInput = document.getElementById('form:R');
const rSpan = document.getElementById('form:RValue');
const messages = document.getElementById('messagesC');

const observerX = new MutationObserver(function (mutationsList) {
    console.log('Mutation observed on X...');
    for (let mutation of mutationsList) {
        xValid = false;
        if (mutation.type === 'childList') {
            const xValue = xSpan.textContent.trim();
            console.log('New X value: ', xValue);
            const hasLetters = /[a-zA-Z]/.test(xValue);
            const xValueFloat = parseFloat(xValue);

            const minLimit = BigInt('-490');
            const maxLimit = BigInt('490');
            if (!isNaN(xValueFloat)) {
                const xValueBigInt = BigInt(Math.round(xValueFloat * 100));
                xValid = !hasLetters && xValueBigInt >= minLimit && xValueBigInt <= maxLimit && xValueBigInt % BigInt('10') === BigInt('0');
                console.log('X value is valid: ', xValid);
            } else {
                xValid = false;
                messages.innerText = 'Invalid value of X';
                console.log('Invalid X value');
                // toggleSubmitBtn();
            }

            if (xValid) {
                messages.innerText = '';
                $("#messagesS").empty();
                xInput.value = xSpan.textContent;  // Обновление значения X в форме
                console.log('X value updated in the form: ', xInput.value);
                // toggleSubmitBtn();
            } else {
                messages.innerText = 'Invalid value of X';
                console.log('Invalid X value, submission button disabled');
                // toggleSubmitBtn();
            }
        } else {
            messages.innerText = 'Invalid value of X';
            xValid = false;
            console.log('Invalid mutation for X');
            // toggleSubmitBtn();
        }
    }
});

observerX.observe(xSpan, { childList: true });

// Обработчик для R (кнопки)
const rButtons = document.querySelectorAll('.form__row .big-btn-2'); // Получаем все кнопки для выбора R
console.log('R buttons found: ', rButtons.length);

rButtons.forEach(button => {
    button.addEventListener('click', function () {
        const selectedRValue = this.getAttribute('data-value');
        console.log('Получено R: ', selectedRValue)
        rInput.value = selectedRValue; // Устанавливаем значение R
        console.log('R value selected: ', selectedRValue);

        messages.innerText = ''; // Стираем сообщение об ошибке, если оно было
        rValid = true;
        redrawGraph(rInput.value);
        console.log('Graph redrawn for R value: ', rInput.value);
        updateDotsOnGraphFromTable();
        // toggleSubmitBtn();  // Проверяем, можно ли отправить форму
        console.log('Form submission button state after R selection: ', submitBtn.disabled);
    });
});

// // Обработчик для кнопок, принимающий значение R непосредственно в метод
// function handleRButtonClick(selectedRValue) {
//     console.log('Получено R: ', selectedRValue);
//
//     // Устанавливаем значение R в скрытое поле
//     const rInput = document.getElementById('form:R');
//     rInput.value = selectedRValue;  // Обновляем значение R в скрытом поле
//     console.log('R value selected: ', selectedRValue);
//
//     // Проверка на валидность выбранного значения R
//     if (selectedRValue !== null && selectedRValue !== '') {
//         rValid = true;  // Устанавливаем флаг валидности R
//         console.log('R value is valid');
//         messages.innerText = '';  // Стираем сообщение об ошибке, если оно было
//     } else {
//         rValid = false;
//         messages.innerText = 'Invalid value of R';  // Если значение некорректно, выводим ошибку
//         console.log('Invalid R value');
//     }
//
//     // Обновление графика и точек на графике
//     redrawGraph(selectedRValue);
//     console.log('Graph redrawn for R value: ', selectedRValue);
//     updateDotsOnGraphFromTable();
//
//     // Проверка, можно ли отправить форму
//     toggleSubmitBtn();  // Проверка, доступна ли кнопка отправки
//     console.log('Form submission button state after R selection: ', submitBtn.disabled);
// }



// Обработчик для Y (p:inputText)
let yInput = document.getElementById('form:Y');
yInput.addEventListener('input', () => {
    console.log('Y input detected...');
    yValid = false;
    let yValue = yInput.value.trim();
    console.log('Y input value: ', yValue);

    const isValid = /^(-?[1-3]|[0-4])(?:[\.,]\d+)?$/.test(yValue);
    yValue = parseFloat(yInput.value.trim().replace(',', '.'));

    if (!isNaN(yValue)) {
        yValid = isValid;
        console.log('Y value is valid: ', yValid);
    } else {
        yValid = false;
        messages.innerText = 'Invalid value of Y (a number in the range (-3;5))';
        console.log('Invalid Y value');
        // toggleSubmitBtn();
    }

    if (!yValid) {
        messages.innerText = 'Invalid value of Y (a number in the range (-3;5))';
        console.log('Invalid Y value, submission button disabled');
        // toggleSubmitBtn();
    } else {
        yInput.value = yInput.value.replace(',', '.');
        messages.innerText = '';
        $("#messagesS").empty();
        console.log('Y value updated and valid');
        // toggleSubmitBtn();
    }
});

function updateXValue(value) {
    var spinnerX = document.getElementById('XValue');
    spinnerX.value = value;
    // Принудительное обновление скрытого поля
    var hiddenX = document.getElementById('hiddenX');
    hiddenX.value = value;
}

// Проверка валидности всех данных и активация кнопки отправки
// const submitBtn = document.getElementById('form:submitBtn');
// function toggleSubmitBtn() {
//     submitBtn.disabled = !(yValid && rValid);  // Блокируем кнопку, если какие-то данные некорректны
//     console.log('Form submission button state: ', submitBtn.disabled);
// }

xInput.value = '0.0';
yInput.value = '';
rInput.value = '';
// toggleSubmitBtn();
