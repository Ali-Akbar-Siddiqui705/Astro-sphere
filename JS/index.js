
const infoCards = document.querySelectorAll('.info-card');
const infoMainTitle = document.getElementById('info-mainTitle');
const infoMainDesc = document.getElementById('info-mainDesc');
const infoPlanet = document.getElementById('info-planet');
const overviewText = document.getElementById('info-overviewText');
const timelineEl = document.getElementById('info-timeline');

const timelines = {
    'Space': [
        { date: '1929', title: 'Edwin Hubble discovery', desc: 'Proved the universe is expanding.' },
        { date: '1990', title: 'Hubble Space Telescope', desc: 'Launched to observe deep space.' }
    ],
    'Space Missions': [
        { date: '1961', title: 'Yuri Gagarin', desc: 'First human in space (Vostok 1).' },
        { date: '1969', title: 'Apollo 11', desc: 'First humans land on the Moon.' },
        { date: '1998', title: 'ISS Assembly', desc: 'International Space Station begins.' }
    ],
    'Technology': [
        { date: '1957', title: 'Sputnik 1', desc: 'First artificial satellite.' },
        { date: '2015', title: 'Falcon 9', desc: 'First reusable rocket landing by SpaceX.' },
        { date: '2021', title: 'James Webb Telescope', desc: 'Launched to observe the early universe.' }
    ],
    'Earth': [
        { date: '4.5 bn yrs ago', title: 'Formation', desc: 'Earth formed from cosmic dust and gas.' },
        { date: '1609', title: 'Galileo Telescope', desc: 'First astronomical observations of Earth’s place in cosmos.' },
        { date: '1972', title: 'Apollo 17', desc: 'The famous “Blue Marble” photo of Earth was taken.' }
    ]
};

function renderTimeline(key) {
    timelineEl.innerHTML = '';
    const items = timelines[key] || [];
    items.forEach(it => {
        const ev = document.createElement('div');
        ev.className = 'event';
        ev.innerHTML = `
        <div class="row">
          <div class="col-lg-6">
          <div class="date">${it.date}</div>
          </div>
          <div class="col-lg-6">
          <div class="desc"><strong>${it.title}</strong><br>${it.desc}</div>
          </div>
        </div>
        `;
        timelineEl.appendChild(ev);
    });
}

infoCards.forEach(card => {
    card.addEventListener('click', () => {
        infoCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        const title = card.dataset.title;
        const color = card.dataset.color;
        const info = card.dataset.info;

        infoMainTitle.textContent = title;
        infoMainDesc.textContent = 'Key facts & timeline below.';
        infoPlanet.textContent = title;
        infoPlanet.style.background = `radial-gradient(circle at 30% 30%, ${color}, #0d1524)`;

        overviewText.innerHTML = info.split('\n').map(line => `<div>${line}</div>`).join('');
        renderTimeline(title);
    });
});

document.querySelector('.info-card[data-title="Space"]').click();


// =========================
// SPACE QUIZ SCRIPT
// =========================
const startBtn = document.getElementById('sq-start-btn');
const questionsDiv = document.getElementById('sq-questions');
const questionEl = document.getElementById('sq-question');
const answersDiv = document.getElementById('sq-answers');
const nextBtn = document.getElementById('sq-next-btn');
const resultDiv = document.getElementById('sq-result');
const scoreEl = document.getElementById('sq-score');
const restartBtn = document.getElementById('sq-restart-btn');
const feedbackEl = document.getElementById('sq-feedback');

let currentIndex = 0;
let score = 0;

const questions = [
    // Topic 1: Space Missions
    { q: "Which mission first landed humans on the Moon?", a: [{ t: "Apollo 11", c: true }, { t: "Gemini 4", c: false }, { t: "Sputnik 1", c: false }, { t: "Voyager 2", c: false }] },
    { q: "Which mission was the first to reach Mars?", a: [{ t: "Viking 1", c: true }, { t: "Mariner 4", c: false }, { t: "Curiosity", c: false }, { t: "Apollo 12", c: false }] },

    // Topic 2: Satellites & Spacecrafts
    { q: "Which satellite was the first artificial object to orbit Earth?", a: [{ t: "Sputnik 1", c: true }, { t: "Hubble Space Telescope", c: false }, { t: "Voyager 1", c: false }, { t: "ISS", c: false }] },
    { q: "Which spacecraft is currently exploring the outer solar system?", a: [{ t: "Voyager 1", c: true }, { t: "Apollo 17", c: false }, { t: "Hubble", c: false }, { t: "Sputnik 2", c: false }] },

    // Topic 3: Astronauts & Human Spaceflight
    { q: "Who was the first woman in space?", a: [{ t: "Valentina Tereshkova", c: true }, { t: "Sally Ride", c: false }, { t: "Mae Jemison", c: false }, { t: "Yuri Gagarin", c: false }] },
    { q: "Who was the first American in space?", a: [{ t: "Alan Shepard", c: true }, { t: "John Glenn", c: false }, { t: "Neil Armstrong", c: false }, { t: "Buzz Aldrin", c: false }] },

    // Topic 4: Astronomy & Universe
    { q: "What is the largest type of star in the universe?", a: [{ t: "Red Supergiant", c: true }, { t: "Neutron Star", c: false }, { t: "White Dwarf", c: false }, { t: "Yellow Dwarf", c: false }] },
    { q: "What is the closest galaxy to the Milky Way?", a: [{ t: "Andromeda", c: true }, { t: "Triangulum", c: false }, { t: "Whirlpool", c: false }, { t: "Messier 81", c: false }] },

    // Topic 5: Earth from Space
    { q: "Which spacecraft took the first full photo of Earth from space?", a: [{ t: "Apollo 8", c: true }, { t: "Voyager 1", c: false }, { t: "Skylab", c: false }, { t: "Sputnik 2", c: false }] },
    { q: "What is the main purpose of Earth observation satellites?", a: [{ t: "Monitor climate and weather", c: true }, { t: "Deep space exploration", c: false }, { t: "Moon landing", c: false }, { t: "Asteroid detection", c: false }] },

    // Topic 6: Solar System Exploration
    { q: "Which planet has the most moons?", a: [{ t: "Saturn", c: true }, { t: "Jupiter", c: false }, { t: "Uranus", c: false }, { t: "Neptune", c: false }] },
    { q: "Which planet is known for its giant storm called the Great Red Spot?", a: [{ t: "Jupiter", c: true }, { t: "Mars", c: false }, { t: "Saturn", c: false }, { t: "Venus", c: false }] },

    // Topic 7: Space Technology & Innovation
    { q: "What is the main purpose of ion thrusters in space?", a: [{ t: "High-speed travel", c: true }, { t: "Deep space communication", c: false }, { t: "Landing spacecraft", c: false }, { t: "Space debris removal", c: false }] },
    { q: "What does “ROVER” usually refer to in space missions?", a: [{ t: "A vehicle that moves on a planet or moon", c: true }, { t: "A satellite in orbit", c: false }, { t: "A space telescope", c: false }, { t: "A communication device", c: false }] },

    // Topic 8: Space History & Future
    { q: "Who was the first human to orbit Earth?", a: [{ t: "Yuri Gagarin", c: true }, { t: "Neil Armstrong", c: false }, { t: "Buzz Aldrin", c: false }, { t: "Alan Shepard", c: false }] },
    { q: "Which organization is responsible for most American space missions?", a: [{ t: "NASA", c: true }, { t: "ESA", c: false }, { t: "SpaceX", c: false }, { t: "Roscosmos", c: false }] }
];

// Start Quiz
startBtn.addEventListener('click', () => {
    startBtn.parentElement.style.display = 'none';
    questionsDiv.style.display = 'block';
    currentIndex = 0;
    score = 0;
    showQuestion();
});

// Next Button
nextBtn.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

// Restart Quiz
restartBtn.addEventListener('click', () => {
    resultDiv.style.display = 'none';
    startBtn.parentElement.style.display = 'block';
});

function showQuestion() {
    resetState();
    const q = questions[currentIndex];
    questionEl.textContent = q.q;

    // Shuffle answers
    const shuffled = q.a.sort(() => Math.random() - 0.5);

    shuffled.forEach(ans => {
        const btn = document.createElement('button');
        btn.textContent = ans.t;
        btn.classList.add('sq-btn');
        if (ans.c) btn.dataset.correct = "true";
        btn.addEventListener('click', selectAnswer);
        answersDiv.appendChild(btn);
    });
}

function resetState() {
    feedbackEl.textContent = "";
    nextBtn.style.display = 'none';
    while (answersDiv.firstChild) {
        answersDiv.removeChild(answersDiv.firstChild);
    }
}

function selectAnswer(e) {
    const selected = e.target;
    const correct = selected.dataset.correct === "true";
    if (correct) {
        selected.classList.add('correct');
        feedbackEl.textContent = "✅ Correct!";
        score++;
    } else {
        selected.classList.add('wrong');
        feedbackEl.textContent = "❌ Wrong!";
    }

    Array.from(answersDiv.children).forEach(btn => {
        if (btn.dataset.correct === "true") btn.classList.add('correct');
        btn.disabled = true;
    });

    nextBtn.style.display = 'block';
}

function showResult() {
    questionsDiv.style.display = 'none';
    resultDiv.style.display = 'block';
    scoreEl.textContent = `✨ You scored ${score} out of ${questions.length} 🚀`;
}
// AOS.init({
//     duration: 1000, // animation ka time in ms
//     once: true      // ek hi baar animation play hogi
// });
// index.js

// Wait for window load
window.addEventListener('load', () => {
    // 1️⃣ Initialize AOS
    AOS.init({
        duration: 1000, // animation ka time in ms
        once: true      // ek hi baar animation play hogi
    });

    // 2️⃣ Refresh AOS positions
    AOS.refresh();

    // 3️⃣ Force layout reflow to fix alignment issues
    document.body.style.display = 'none';
    document.body.offsetHeight; // triggers reflow
    document.body.style.display = '';

    // 4️⃣ Optional: tiny scroll trick for extra safety
    window.scrollBy(0, 1);
    window.scrollBy(0, -1);
});
