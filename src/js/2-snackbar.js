import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.querySelector('.form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const delay = Number(document.querySelector('input[name="delay"]').value);
  const state = event.target.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then((delay) => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#59a10d', 
        color: '#ffffff', 
        
      });
    })
    .catch((delay) => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        backgroundColor: '#ef4040',
        color: '#ffffff',
        
      });
    });
});