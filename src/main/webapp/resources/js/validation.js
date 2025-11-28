// Функция для валидации ввода в реальном времени
function validateXInput(event) {
    const key = event.key;
    const currentValue = event.target.value;

    // Разрешаем только: цифры, точка, запятая, минус, плюс и управляющие клавиши
    const allowedKeys = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        '.', ',', '-', '+',
        'Backspace', 'Delete', 'Enter', 'Tab',
        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
        'Home', 'End'
    ];

    // Блокируем все неразрешенные символы
    if (!allowedKeys.includes(key)) {
        event.preventDefault();
        return false;
    }

    // Запрещаем минус/плюс не в начале
    if ((key === '-' || key === '+') && event.target.selectionStart !== 0) {
        event.preventDefault();
        return false;
    }

    // Запрещаем второй минус или плюс
    if ((key === '-' || key === '+') && (currentValue.includes('-') || currentValue.includes('+'))) {
        event.preventDefault();
        return false;
    }

    // Запрещаем вторую точку или запятую
    if ((key === '.' || key === ',') && /[.,]/.test(currentValue)) {
        event.preventDefault();
        return false;
    }

    return true;
}

// Функция для форматирования ввода
function formatXInput(input) {
    let value = input.value;

    // Удаляем все недопустимые символы (кроме цифр, точки, запятой, минуса, плюса)
    value = value.replace(/[^\d.,+-]/g, '');

    // Заменяем запятые на точки
    value = value.replace(/,/g, '.');

    // Удаляем лишние знаки (оставляем только первый минус или плюс, и только в начале)
    if (value.length > 1) {
        // Если первый символ не минус/плюс, то удаляем все минусы и плюсы
        if (value[0] !== '-' && value[0] !== '+') {
            value = value.replace(/[-+]/g, '');
        } else {
            // Если первый символ минус/плюс, то удаляем все минусы/плюсы после первого
            const firstChar = value[0];
            value = firstChar + value.slice(1).replace(/[-+]/g, '');
        }
    }

    // Удаляем лишние точки (оставляем первую)
    const dotCount = (value.match(/\./g) || []).length;
    if (dotCount > 1) {
        const firstDotIndex = value.indexOf('.');
        value = value.substring(0, firstDotIndex + 1) + value.substring(firstDotIndex + 1).replace(/\./g, '');
    }

    // Ограничение длины
    if (value.length > 12) {
        value = value.substring(0, 12);
    }

    input.value = value;
}

// Обработчик вставки текста
function handlePaste(event) {
    setTimeout(() => {
        formatXInput(event.target);
    }, 0);
}

// Инициализация валидации
function initValidation() {
    const xInput = document.getElementById('form:XValue');
    if (xInput) {
        // Удаляем старые обработчики чтобы избежать дублирования
        xInput.removeEventListener('keydown', validateXInput);
        xInput.removeEventListener('input', formatXInputHandler);
        xInput.removeEventListener('paste', handlePaste);

        // Добавляем новые обработчики
        xInput.addEventListener('keydown', validateXInput);
        xInput.addEventListener('input', formatXInputHandler);
        xInput.addEventListener('paste', handlePaste);
    }
}

// Обработчик input события
function formatXInputHandler() {
    formatXInput(this);
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    initValidation();

    // Наблюдаем за изменениями в DOM для обработки AJAX-обновлений
    const observer = new MutationObserver(function(mutations) {
        initValidation();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// Альтернативная инициализация для PrimeFaces AJAX
if (window.PrimeFaces) {
    PrimeFaces.ajax.addOnComplete(function() {
        setTimeout(initValidation, 50);
    });
}