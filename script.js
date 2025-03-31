let timer;
let isRunning = false;
let lapCounter = 1;
let centiseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById('startStop').textContent = 'Start';
        document.getElementById('startStop').style.backgroundColor = '#2ecc71';
        isRunning = false;
    } else {
        timer = setInterval(updateDisplay, 10); // Update every 10ms for centiseconds
        document.getElementById('startStop').textContent = 'Stop';
        document.getElementById('startStop').style.backgroundColor = '#e74c3c';
        isRunning = true;
    }
}

function updateDisplay() {
    centiseconds++;
    
    if (centiseconds === 100) {
        centiseconds = 0;
        seconds++;
    }

    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    if (minutes === 60) {
        minutes = 0;
        hours++;
    }

    document.getElementById('display').textContent = 
        (hours < 10 ? '0' + hours : hours) + ':' +
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds) + '.' +
        (centiseconds < 10 ? '0' + centiseconds : centiseconds);
}

function lap() {
    if (!isRunning) return; // Only allow lap when timer is running
    
    let display = document.getElementById('display').textContent;
    let lapItem = document.createElement('li');
    lapItem.textContent = 'Lap ' + lapCounter + ': ' + display;
    
    // Insert new lap at the beginning
    const lapsList = document.getElementById('laps');
    if (lapsList.firstChild) {
        lapsList.insertBefore(lapItem, lapsList.firstChild);
    } else {
        lapsList.appendChild(lapItem);
    }
    
    lapCounter++;
}

function reset() {
    clearInterval(timer);
    hours = 0;
    minutes = 0;
    seconds = 0;
    centiseconds = 0;
    document.getElementById('display').textContent = '00:00:00.00';
    document.getElementById('startStop').textContent = 'Start';
    document.getElementById('startStop').style.backgroundColor = '#2ecc71';
    isRunning = false;
    lapCounter = 1;
    document.getElementById('laps').innerHTML = '';
}

document.getElementById('startStop').addEventListener('click', startStop);
document.getElementById('lap').addEventListener('click', lap);
document.getElementById('reset').addEventListener('click', reset);