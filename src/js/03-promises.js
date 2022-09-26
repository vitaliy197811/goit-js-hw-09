import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  let inputDelay = Number(document.querySelector('[name="delay"]').value);
  let inputStep = Number(document.querySelector('[name="step"]').value);
  let inputAmount = Number(document.querySelector('[name="amount"]').value);
  
  if ( inputDelay >= 0 && inputStep >= 0 && inputAmount >= 0 ) {
    for (let position = 1; position <= inputAmount; position += 1) {
      createPromise(position, inputDelay)
      .then((position, delay) => Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`))
      .catch((position, delay) => Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
      inputDelay += inputStep;
    }
  } else {
    window.alert("Всі значення у полях не повинні бути від'ємними");
    return;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      }
      reject({position, delay});
    }, delay);
  });
}

