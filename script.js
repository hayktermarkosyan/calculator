window.addEventListener('load', function OnWindowLoaded() {
    let result = 0;
    let temp = '';
    let inputVal = document.getElementById('inputVal');
    let state = 0;
    let values = [];
    let intermedRes = 0;

    function onNumberClick(e) {
        debugger
       
        const n = e.target.dataset['number'];

        if (state == 1 && temp != '') { // after sign
            temp = '';
        }
        state = 0;
        if (n == '0' && temp == '0') {
            return;
        } else if (temp == '0' && n != ".") {
            temp = n;
        } else if(n == "." && temp == "") {
            temp += 0 + n;
        } else {
            temp += n;
        }
        
        show(temp);
    }

    function onSignClick(e) {
        const s = e.target.dataset['sign'];

        if (state == 1 && s != "del") {
            return;
        }
        state = 1;

        if (values.length === 1 && s != "del" && temp !== "") { 
            if (values[0] === "+" || values[0] === "-" || values[0] === "*" || values[0] === "/") {
                values[0] += temp;
            } else {
                values[0] = temp;
            }
        }

        if (values.length === 0 || values.length > 1) {
            if (s != "del") {
                values.push(temp);  
                temp = "";  
                if (isNaN(values[values.length - 2]) === false 
                    && isNaN(values[values.length - 2]) === false) {
                    values[values.length - 2] += values[values.length - 1];
                    values.pop();
                }            
            } else if(s == "del" && values.length === 0) {
                values.push(temp); 
            }
        }       

        if (s != "del" && s != "sqrt" && s != "pow") {
            if (values[values.length - 1] === "") {
                values.pop();
            }
            values.push(s);                
        }

        if (s == '=') {

            for (let i = 0; i < values.length; i++) {
                if (values[i] == '*' || values[i] == '/') {
                    if (values[i] == '*') {
                        intermedRes = +values[i - 1] * +values[i + 1];
                    } else if(values[i] == '/') {
                        intermedRes = +values[i - 1] / +values[i + 1];
                    }
                    values.splice(i - 1, 3);
                    values.splice(i - 1, 0, intermedRes.toString());
                    i = 0;
                }
            }

            for (let i = 0; i < values.length; i++) {
                if (values[i] == '+' || values[i] == '-') {
                    if (values[i] == '+') {
                        intermedRes = +values[i - 1] + +values[i + 1];
                    } else if(values[i] == '-') {
                        intermedRes = +values[i - 1] - +values[i + 1];
                    }
                    values.splice(i - 1, 3);
                    values.splice(i - 1, 0, intermedRes.toString());
                    i = 0;
                }
            }

            if (values[0] === "Infinity") {
                values[0] = "Error";
            }

            result = values[0];
            values = [];
            values.push(result);

            inputVal.value = '';
            show(result);
            state = 0;
            temp = '';
            return;
        }

        if (s == 'sqrt') {
            if (values.length === 1) {
                result = Math.sqrt(values[0]);
                values = [];
                values.push(result);

                inputVal.value = '';
                show(result.toString());
                state = 0;
                temp = '';
                return;
            }

            for (let i = 0; i < values.length; i++) {
                if (values[i] == '*' || values[i] == '/') {
                    if (values[i] == '*') {
                        intermedRes = +values[i - 1] * +values[i + 1];
                    } else if(values[i] == '/') {
                        intermedRes = +values[i - 1] / +values[i + 1];
                    }
                    values.splice(i - 1, 3);
                    values.splice(i - 1, 0, intermedRes.toString());
                    i = 0;
                }
            }

            for (let i = 0; i < values.length; i++) {
                if (values[i] == '+' || values[i] == '-') {
                    if (values[i] == '+') {
                        intermedRes = +values[i - 1] + +values[i + 1];
                    } else if(values[i] == '-') {
                        intermedRes = +values[i - 1] - +values[i + 1];
                    }
                    values.splice(i - 1, 3);
                    values.splice(i - 1, 0, intermedRes.toString());
                    i = 0;
                }
            }

            result = Math.sqrt(values[0]);
            values = [];
            values.push(result);

            inputVal.value = '';
            show(result);
            state = 0;
            temp = '';
            return;
        }

        if (s == 'pow') {
            if (values.length === 1) {
                result = Math.pow(values[0], 2);
                values = [];
                values.push(result);

                inputVal.value = '';
                show(result.toString());
                state = 0;
                temp = '';
                return;
            }

            for (let i = 0; i < values.length; i++) {
                if (values[i] == '*' || values[i] == '/') {
                    if (values[i] == '*') {
                        intermedRes = +values[i - 1] * +values[i + 1];
                    } else if(values[i] == '/') {
                        intermedRes = +values[i - 1] / +values[i + 1];
                    }
                    values.splice(i - 1, 3);
                    values.splice(i - 1, 0, intermedRes.toString());
                    i = 0;
                }
            }

            for (let i = 0; i < values.length; i++) {
                if (values[i] == '+' || values[i] == '-') {
                    if (values[i] == '+') {
                        intermedRes = +values[i - 1] + +values[i + 1];
                    } else if(values[i] == '-') {
                        intermedRes = +values[i - 1] - +values[i + 1];
                    }
                    values.splice(i - 1, 3);
                    values.splice(i - 1, 0, intermedRes.toString());
                    i = 0;
                }
            }

            result = Math.pow(values[0], 2);
            values = [];
            values.push(result);

            inputVal.value = '';
            show(result);
            state = 0;
            temp = '';
            return;
        }

        if (s == "del" && (values[values.length - 1] === "+" 
                        || values[values.length - 1] === "-" 
                        || values[values.length - 1] === "*"
                        || values[values.length - 1] === "/")) {
            if (temp !== "") {
                values.push(temp);
                temp = "";
            }
            
            if (values[values.length - 1].length > 1) {
                values[values.length - 1] = values[values.length - 1].slice(0, -1);
            } else {
                values.pop();
            }
            
            values.length === 0 ? inputVal.value = '0' : inputVal.value = '';
            state = 0;
            if (values.length >= 3) {
                temp = '';
            }

            let totalVal = "";

            values.map(value => totalVal += value);
             
            if (totalVal !== "") {
                show(totalVal);
                
                if(totalVal.includes("+") || totalVal.includes("-")
                    || totalVal.includes("*") || totalVal.includes("/")) {
                    for (let i = totalVal.length - 1; i > 0; i--) {
                        if (isNaN(totalVal[i]) === false) {
                            temp += totalVal[i];
                        } else {
                            if (i = totalVal.length - 1) {
                                values.push(temp);
                            }
                            break;
                        }
                    }
    
                    temp = temp.split("").reverse().join("");
                    values.pop();
                    temp = "";
                }                
            }
            
            if (values.length === 0) {
                temp = '';
            }
        } else if (s == "del") {
            if (values[values.length - 1] === "") {
                values[values.length - 1] = temp;
            }
            values[values.length - 1] = values[values.length - 1].slice(0, -1);
            temp = values[values.length - 1];
            values.pop();
            state = 0;
            if (values.length === 1 && values[values.length - 1].length === 0) {
                show("0");
            } else {
                inputVal.value = '';
                if (values.length === 0) {
                    inputVal.value = '0';
                    temp = "";
                } else {
                    values.push(temp)
                    let totalVal = "";

                    values.map(value => totalVal += value);
                    
                    if (totalVal !== "") {
                        show(totalVal);
                    }

                    temp = "";
                }
            }
        }

        if (s != "del") {
            show(s);               
        }
    }

    function onClearClick(e) {
        inputVal.value = '0';
        temp = '';
        values = [];
        state = 0;
    }

    function show(data) {
        let str = '';

        if (isNaN(data) && data != '=') {
            inputVal.value += data;
            return;
        }

        if (result && data == '=') {
            inputVal.value = result.toString();
            return;
        }

        if (isNaN(inputVal.value)) {
            // if (s == "del") {
            //     inputVal.value += data;
            //     return;
            // }
            inputVal.value += data.slice(-1);
            return;
        }

        if (data) {
            str += data;
        }

        inputVal.value = str;
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