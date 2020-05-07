console.log('Client side javascript file is loaded!');

const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const msg_1 = document.querySelector('#msg_1');
const msg_2 = document.querySelector('#msg_2');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    msg_1.textContent = '';
    msg_2.textContent = '';
    fetch('http://localhost:3000/weather?address=' + input.value).then((response) => {
        response.json().then((resp) => {
            if (resp.error) {
                msg_1.textContent = resp.error;
            } else {
                msg_1.textContent = resp.location;
                msg_2.textContent = resp.forecast + ' Current time is ' + resp.time;
            }
        })
    });
});