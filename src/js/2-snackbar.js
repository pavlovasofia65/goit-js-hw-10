import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const radio = document.querySelector('.lab-rad');
const fulfilled = document.querySelector('.green'); 
const button = document.querySelector('[type="submit"]');
const delay = document.querySelector('[type="number"]');
button.addEventListener("click", (evt) => {
    evt.preventDefault();
    const delayValue = parseInt(delay.value, 10);
    const promise = new Promise((resolve, reject) => {

        setTimeout(() => {
            if (fulfilled.checked) {
                resolve(`✅ Fulfilled promise in ${delayValue}ms`);
            } else {
                reject(`❌ Rejected promise in ${delayValue}ms`);
            }
        }, delayValue);
        
    });

    promise
    .then((message) => {
        iziToast.success({
            message:message,
            position: 'topRight',
            timeout: 3000,
        });
    })
    .catch((message) => {
        iziToast.error({
            message:message,
            position: 'topRight',
            timeout: 3000,
        });
    });
});