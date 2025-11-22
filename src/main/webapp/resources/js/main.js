window.addEventListener('load', function () {
    console.log('Window loaded, initializing form values...');

    // Инициализация X
    const xInput = document.getElementById('form:XValue');
    if(xInput) xInput.value = '0';
    console.log('Initial X value set to: ', xInput.value);

    // Инициализация R и графика
    const rRadio = document.querySelector('input[name="form:RValue"]:checked');
    if (rRadio) {
        redrawGraph(rRadio.value);
        // Небольшая задержка для гарантированной отрисовки
        setTimeout(() => {
            updateDotsOnGraphFromTable();
        }, 100);
        console.log('Initial R value: ', rRadio.value);
    }

    // Установка source по умолчанию
    const sourceInput = document.getElementById('form:source');
    if (sourceInput) sourceInput.value = 'form';

    // Настройка обработчиков R
    setupRChangeListener();
});