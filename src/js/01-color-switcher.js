const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');
let timerId = null;

startBtnRef.addEventListener('click', () => {
    timerId = setInterval(startRandomColor, 1000)
    startBtnRef.disabled = true;
    stopBtnRef.disabled = false;
});

function startRandomColor(e) {
    document.body.style.backgroundColor = getRandomHexColor();
    function getRandomHexColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
};

stopBtnRef.addEventListener('click', () => {
    clearInterval(timerId)
    startBtnRef.disabled = false;
    stopBtnRef.disabled = true;
})
