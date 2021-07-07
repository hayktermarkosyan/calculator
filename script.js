window.addEventListener('load', function OnWindowLoaded() {

    let result = 0;
    let temp = '';
    let sign = undefined;
    let inputVal = document.getElementById('inputVal');
    let state = 0;

    function onNumberClick(e) {
        const n = e.target.dataset['number'];

        if (state == 1 && temp != '') { // after sign
            result = temp;
            temp = '';
            state = 0;
        }
        state = 0;
        if (n == '0' && temp == '0') {
            return;
        } else if (temp == '0') {
            temp = n;
        } else {
            temp += n;
        }

        show(temp);
    }

    function onSignClick(e) {
        if (state == 1) {
            return;
        }
        state = 1;
        const s = e.target.dataset['sign'];

        if (s == '=') {
            switch (sign) {
                case '+':
                    result = +(result) + +(temp);
                    break;
                case '-':
                    result -= temp;
                    break;
                case '*':
                    result *= temp;
                    break;
                case '/':
                    result /= temp;
                    break;
                default:
                    break;
            }
            show(result);
            state = 0;
            temp = '';
            return;
        }

        sign = s;
    }

    function onClearClick(e) {
        result = 0;
        temp = '';
        sign = undefined;
        state = 0;
        show(result);
    }

    function show(data) {
        inputVal.value = data;
    }

    document.querySelectorAll('.btn-number').forEach(function(btn) {
        btn.addEventListener('click', onNumberClick)
    })

    document.querySelectorAll('.btn-sign').forEach(function(btn) {
        btn.addEventListener('click', onSignClick)
    })

    document.querySelectorAll('.btn-c').forEach(function(btn) {
        btn.addEventListener('click', onClearClick)
    })

});