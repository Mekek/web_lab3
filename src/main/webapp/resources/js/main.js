window.addEventListener('load', function () {
    console.log('Window loaded, initializing form values...');

    // Инициализация X
    const xInput = document.getElementById('form:XValue');
    if(xInput) xInput.value = '0';
    console.log('Initial X value set to: ', xInput.value);

    // Инициализация R
    const rRadio = document.querySelector('input[name="form:RValue"]:checked');
    if (rRadio) {
        redrawGraph(rRadio.value);
        updateDotsOnGraphFromTable();
        console.log('Initial R value: ', rRadio.value);
    }

    // Установка source по умолчанию
    const sourceInput = document.getElementById('form:source');
    if (sourceInput) sourceInput.value = 'form';

    updateDotsOnGraphFromTable();
});