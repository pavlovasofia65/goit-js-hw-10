import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const radio = document.querySelector('.lab-rad');
const fulfilled = document.querySelector('[value="fulfilled"]'); 
const rejected = document.querySelector('[value="rejected"]');
const button = document.querySelector('[type="submit"]');
const delay = document.querySelector('[type="number"]');
const form = document.querySelector('.form');
form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const delayValue = parseInt(delay.value, 10);
    const isFulfilled = fulfilled.checked;
    const isRejected = rejected.checked;
    const promise = new Promise((resolve, reject) => {

        setTimeout(() => {
            if (isFulfilled) {
                resolve(`✅ Fulfilled promise in ${delayValue}ms`);
            } else if (isRejected) {
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