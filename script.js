//DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");
const container = document.querySelector(".container");

const quizQuestions = [
  {
    question: "When learning something new, what helps you the most?",
    answers: [
      { text: "Listening to explanations or discussions", type: "Auditory" },
      {
        text: "Taking notes and reading instructions",
        type: "Reading/Writing",
      },
      { text: "Watching diagrams or videos", type: "Visual" },
      { text: "Trying it out yourself", type: "Kinesthetic" },
    ],
  },
  {
    question: "If you get stuck on a problem, what do you do?",
    answers: [
      { text: "Experiment and test different solutions", type: "Kinesthetic" },
      {
        text: "Re-read the instructions or search articles",
        type: "Reading/Writing",
      },
      { text: "Ask someone to explain it to you", type: "Auditory" },
      { text: "Look at examples or visual guides", type: "Visual" },
    ],
  },
  {
    question: "What type of class do you enjoy the most?",
    answers: [
      { text: "Hands-on activities and practice", type: "Kinesthetic" },
      { text: "Lectures and discussions", type: "Auditory" },
      {
        text: "Reading materials and writing exercises",
        type: "Reading/Writing",
      },
      { text: "Slides, charts, and videos", type: "Visual" },
    ],
  },
  {
    question: "How do you usually remember things?",
    answers: [
      {
        text: "By writing them down or reading again",
        type: "Reading/Writing",
      },
      { text: "By hearing or explaining them out loud", type: "Auditory" },
      { text: "By doing or practicing repeatedly", type: "Kinesthetic" },
      { text: "By picturing them in your mind", type: "Visual" },
    ],
  },
  {
    question: "What motivates you the most when learning?",
    answers: [
      { text: "Clear visuals and demonstrations", type: "Visual" },
      {
        text: "Interactive activities and building things",
        type: "Kinesthetic",
      },
      { text: "Detailed notes and written guides", type: "Reading/Writing" },
      { text: "Listening to engaging explanations", type: "Auditory" },
    ],
  },
];

let currentQuestionIndex = 0;
let typeScores = {
  Visual: 0,
  Auditory: 0,
  "Reading/Writing": 0,
  Kinesthetic: 0,
};
let answerDisabled = false;

// Learner Type Data
const learnerTypes = {
  Visual: {
    name: "Visual Learner",
    image: "image/visual.PNG",
    description:
      "You learn best through images, diagrams, charts, and videos. You have a strong ability to visualize concepts and prefer written instructions. You excel at understanding spatial relationships and often think in pictures.",
  },
  Auditory: {
    name: "Auditory Learner",
    image: "image/auditory.PNG",
    description:
      "You learn best through listening and discussion. You have excellent listening skills and benefit from lectures, conversations, and verbal instructions. You often remember information better when you hear it or talk it out loud.",
  },
  "Reading/Writing": {
    name: "Reading/Writing Learner",
    image: "image/readingwriting.PNG",
    description:
      "You learn best through reading and writing. You prefer detailed notes, written instructions, and reading materials. You excel at organizing information through lists, essays, and written summaries.",
  },
  Kinesthetic: {
    name: "Kinesthetic Learner",
    image: "image/kinesthetic.PNG",
    description:
      "You learn best through doing and hands-on experience. You prefer practical activities, experiments, and real-world applications. You excel when you can physically manipulate objects or experience concepts directly.",
  },
};

totalQuestionsSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  typeScores = { Visual: 0, Auditory: 0, ReadingWriting: 0, Kinesthetic: 0 };
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  showQuestion();
}

function showQuestion() {
  answerDisabled = false;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  if (!currentQuestion) return;

  questionText.textContent = currentQuestion.question;
  answersContainer.innerHTML = "";
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.type = answer.type;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });

  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  const progressPercent =
    (currentQuestionIndex / (quizQuestions.length - 1)) * 100;
  progressBar.style.width = progressPercent + "%";
}

function selectAnswer(event) {
  if (answerDisabled) return;
  answerDisabled = true;

  const selectedType = event.currentTarget.dataset.type;
  if (selectedType && typeScores[selectedType] !== undefined) {
    typeScores[selectedType]++;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function applyTypeTheme(type) {
  container.classList.remove(
    "type-visual",
    "type-auditory",
    "type-readingwriting",
    "type-kinesthetic",
  );
  if (!type) return;
  container.classList.add(`type-${type.toLowerCase()}`);
}

function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  const sortedTypes = Object.entries(typeScores).sort((a, b) => b[1] - a[1]);
  const topType = sortedTypes[0][0];
  const learnerData = learnerTypes[topType];

  // Display result
  document.getElementById("result-type").textContent = learnerData.name;
  document.getElementById("result-description").textContent =
    learnerData.description;
  document.getElementById("result-image").src = learnerData.image;
  document.getElementById("result-image").alt = learnerData.name;

  applyTypeTheme(topType);
}
function restartQuiz() {
  resultScreen.classList.remove("active");
  applyTypeTheme(null);
  startQuiz();
}
