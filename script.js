document.addEventListener('DOMContentLoaded', () => {
  // Agenda handling
  const agendaInput = document.getElementById('agenda-input');
  const addAgendaBtn = document.getElementById('add-agenda');
  const agendaListEl = document.getElementById('agenda-list');

  addAgendaBtn.addEventListener('click', () => {
    const text = agendaInput.value.trim();
    if (text) {
      const li = document.createElement('li');
      li.textContent = text;
      agendaListEl.appendChild(li);
      agendaInput.value = '';
    }
  });

  // Speaker list handling
  const speakerInput = document.getElementById('speaker-input');
  const addSpeakerBtn = document.getElementById('add-speaker');
  const speakerListEl = document.getElementById('speaker-list');
  const nextSpeakerBtn = document.getElementById('next-speaker');
  const currentSpeakerEl = document.getElementById('current-speaker');
  let speakers = [];

  addSpeakerBtn.addEventListener('click', () => {
    const name = speakerInput.value.trim();
    if (name) {
      speakers.push(name);
      const li = document.createElement('li');
      li.textContent = name;
      speakerListEl.appendChild(li);
      speakerInput.value = '';
    }
  });

  function refreshSpeakers() {
    speakerListEl.innerHTML = '';
    speakers.forEach((s) => {
      const li = document.createElement('li');
      li.textContent = s;
      speakerListEl.appendChild(li);
    });
  }

  nextSpeakerBtn.addEventListener('click', () => {
    if (speakers.length > 0) {
      const current = speakers.shift();
      currentSpeakerEl.textContent = current;
      refreshSpeakers();
      resetTimer();
      startTimer();
    }
  });

  // Timer
  const timerEl = document.getElementById('timer');
  const startBtn = document.getElementById('start-timer');
  const stopBtn = document.getElementById('stop-timer');
  const resetBtn = document.getElementById('reset-timer');
  let timerInterval = null;
  let seconds = 0;

  function updateTimer() {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    timerEl.textContent = `${m}:${s}`;
  }

  function startTimer() {
    if (timerInterval) return;
    timerEl.classList.remove('over');
    timerInterval = setInterval(() => {
      seconds++;
      updateTimer();
      if (seconds >= 60) {
        timerEl.classList.add('over');
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  function resetTimer() {
    stopTimer();
    seconds = 0;
    timerEl.classList.remove('over');
    updateTimer();
  }

  startBtn.addEventListener('click', startTimer);
  stopBtn.addEventListener('click', stopTimer);
  resetBtn.addEventListener('click', resetTimer);

  updateTimer();
});

