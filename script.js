const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxICEz9UNMBm4pPL2D861_3q5nEJ8jNelbdCcPOgw4iFI3QPx2fun27JvWmJ-Cv-pg_Ng/exec';

const questions = [
  {
    question: "Siapa center lagu 'Ponytail to Shushu' versi JKT48 tahun 2024?",
    options: ["Freya", "Adel", "Muthe", "Shani"],
    answer: "Freya"
  },
  {
    question: "Event tahunan JKT48 2025 bernama?",
    options: ["JKT48 Summer Fest", "JKT48 New Era", "JKT48 13th Anniversary", "JKT48 Fes 2025"],
    answer: "JKT48 13th Anniversary"
  },
  {
    question: "Siapa yang menjadi kapten Tim J pada tahun 2025?",
    options: ["Zee", "Muthe", "Oniel", "Christy"],
    answer: "Oniel"
  },
  {
    question: "Subunit terbaru JKT48 yang diumumkan 2024?",
    options: ["JKT48 Voice", "JKT48 Acoustic", "JKT48 Vibes", "JKT48 Stars"],
    answer: "JKT48 Vibes"
  },
  {
    question: "Freya membintangi iklan brand apa di 2024?",
    options: ["Teh Pucuk", "Indomie", "Erigo", "Tokopedia"],
    answer: "Erigo"
  },
  {
    question: "Lagu original JKT48 tahun 2024?",
    options: ["Berani Bersuara", "Flying High", "Rapsodi", "Seventeen"],
    answer: "Seventeen"
  },
  {
    question: "Siapa JKT48 Academy Class A center 2024?",
    options: ["Indah", "Cathy", "Fiony", "Gita"],
    answer: "Indah"
  },
  {
    question: "Event Senbatsu Sousenkyo terakhir digelar tahun?",
    options: ["2022", "2020", "2023", "2021"],
    answer: "2020"
  },
  {
    question: "JKT48 merilis photobook pada tahun?",
    options: ["2023", "2024", "2022", "2025"],
    answer: "2023"
  },
  {
    question: "Siapa member yang aktif bikin konten Youtube 2024?",
    options: ["Adel", "Zee", "Christy", "Fiony"],
    answer: "Zee"
  },
  {
    question: "Center lagu 'Flying High'?",
    options: ["Adel", "Fiony", "Freya", "Zee"],
    answer: "Zee"
  },
  {
    question: "JKT48 saat ini berada di generasi ke?",
    options: ["10", "11", "12", "13"],
    answer: "13"
  },
  {
    question: "Siapa yang keluar dari JKT48 tahun 2023 bulan juni?",
    options: ["Muthe", "Jesslyn", "Geby", "Ariel"],
    answer: "Jesslyn"
  },
  {
    question: "Kapan ulang tahun JKT48?",
    options: ["17 Desember", "15 Januari", "25 Oktober", "11 Maret"],
    answer: "17 Desember"
  },
  {
    question: "JKT48 mengadakan tour ke kota mana di 2024?",
    options: ["Surabaya", "Bandung", "Yogyakarta", "Bali"],
    answer: "Bandung"
  },
  {
      "question": "Siapa member JKT48 yang menjadi center lagu 'Seventeen'?",
      "options": ["Freya", "Adel", "Oniel", "Christy"],
      "answer": "Christy" 
  },
  {
    question: "Kapan MV #KuSangatSuka rilis di Youtube?",
    options: ["2021", "2025", "2024", "2023"],
    answer: "2025"
  },
  {
    question: "Aplikasi resmi untuk streaming JKT48?",
    options: ["SHOWROOM", "TikTok", "NetFlix", "WeTV"],
    answer: "SHOWROOM"
  },
  {
    question: "Acara ulang tahun JKT48 2024 diadakan di?",
    options: ["Basket Hall GBK", "Tennis Indoor Senayan", "Balai Sarbini", "Teater JKT48"],
    answer: "Tennis Indoor Senayan"
  },
  {
    question: "Kapan JKT48 terakhir merilis single fisik?",
    options: ["2023", "2024", "2022", "2021"],
    answer: "2023"
  }
];

let currentQuestion = 0;
let score = 0;
let playerName = "";

function startQuiz() {
  const nameInput = document.getElementById("name");
  if (!nameInput.value.trim()) return alert("masukin nama km dulu y");
  playerName = nameInput.value.trim();
  document.getElementById("welcome-screen").classList.add("hidden");
  document.getElementById("quiz-container").classList.remove("hidden");

  setTimeout(() => {
    loadQuestion();
    loadLeaderboard();
  }, 100);

  const bgm = document.getElementById("bgm");
  if (bgm) {
    bgm.play().catch(() => {
      console.log("blocked");
    });
  }
}

function loadQuestion() {
  if (currentQuestion >= questions.length) {
    document.getElementById("quiz").innerHTML = "<h2>kuis udah selesai dek</h2>";
    return;
  }

  const q = questions[currentQuestion];
  const container = document.getElementById("quiz");
  let html = `
    <div class="question" data-aos="fade-up">
      <h2>${q.question}</h2>
      ${q.options.map(opt => `<button onclick="checkAnswer('${opt}')">${opt}</button>`).join("")}
    </div>
  `;
  container.innerHTML = html;
  AOS.refresh();
}

function showPopup(text, correct = true) {
  const popup = document.createElement("div");
  popup.className = "popup " + (correct ? "popup-correct" : "popup-wrong");
  popup.innerText = correct ? "LAHHH BENER KOCAGGG" : text;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.classList.add("show");
    setTimeout(() => {
      popup.classList.remove("show");
      setTimeout(() => popup.remove(), 300);
    }, 1500);
  }, 100);
}

function checkAnswer(selected) {
  const correct = questions[currentQuestion].answer;
  if (selected === correct) {
    score++;
    showPopup("LAHHH BENER KOCAGGG", true);
  } else {
    score--;
    showPopup(`salah kocag, jawabannya tuh ini ${correct}`, false);
  }

  const scoreDisplay = document.getElementById("score");
  if (scoreDisplay) scoreDisplay.innerText = score;

  currentQuestion++;
  setTimeout(() => {
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      document.getElementById("quiz").innerHTML = "<h2>kuis udah selesai dek</h2>";
    }
  }, 1000);
}

function submitScore() {
  if (currentQuestion < questions.length) {
    alert("Kerjain Sampe Selesai Dulu Kocagg");
    return;
  }

  if (score < 0) {
    alert("scorenya gaboleh minus ya dek.");
    return;
  }

  fetch(SHEET_URL)
    .then(res => res.json())
    .then(data => {
      const isNameUsed = data.some(entry => entry.name.toLowerCase() === playerName.toLowerCase());
      if (isNameUsed) {
        alert("Ganti namamu, gaboleh kembaran sama nama orang.");
        return;
      }

      fetch(`${SHEET_URL}?name=${encodeURIComponent(playerName)}&score=${score}`, {
        method: 'POST'
      }).then(() => {
        alert("makasih udah ngerjain.");
        loadLeaderboard();
      });
    });
}

function loadLeaderboard() {
  fetch(SHEET_URL)
    .then(res => res.json())
    .then(data => {
      let html = '<h2>Papan Peringkat Kelas Prof. Cynthia</h2><table><tr><th>Nama</th><th>Score</th></tr>';
      data.sort((a, b) => b.score - a.score).forEach(entry => {
        html += `<tr><td>${entry.name}</td><td>${entry.score}</td></tr>`;
      });
      html += '</table>';

      const leaderboard = document.getElementById('leaderboard');
      const leaderboardWelcome = document.getElementById('leaderboard-welcome');
      if (leaderboard) leaderboard.innerHTML = html;
      if (leaderboardWelcome) leaderboardWelcome.innerHTML = html;
    });
}

loadLeaderboard();
