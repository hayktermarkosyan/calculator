window.addEventListener('load', function OnWindowLoaded() {
    let signs = [
        '7', '8', '9', 'C',
        '4', '5', '6', '/',
        '1', '2', '3', '*',
        '0', '+', '-', '='
    ];

    let calculator = document.getElementById('calc');

    let textArea = document.getElementById('inputVal');

    signs.forEach(function(sign) {
        let signElement = document.createElement('div');
        signElement.className = 'btn btnPrivSet';
        signElement.innerHTML = sign;
        calculator.appendChild(signElement);
    });

    document.querySelectorAll('#calc-wrap .btn.btnPrivSet').forEach(function(button) {
        button.addEventListener('click', onButtonClick);
    });

    function onButtonClick(e) {
        if (e.target.innerHTML === 'C') {
            textArea.innerHTML = '0';
        } else if (e.target.innerHTML === '=') {
            textArea.innerHTML = eval(textArea.innerHTML);
        } else if (e.target.innerHTML === '&radic;') {
            textArea.innerHTML = Math.sqrt(textArea.innerHTML);
        } else if (textArea.innerHTML === '0') {
            textArea.innerHTML = e.target.innerHTML;
        } else {
            textArea.innerHTML += e.target.innerHTML;
        }
    }
});