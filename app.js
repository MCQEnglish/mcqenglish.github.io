(() => {
  "use strict";

  const bank = window.EnglishQuestionBank;
  const storageKey = "englishArenaProgressV1";

  const screens = {
    setup: document.getElementById("setupScreen"),
    quiz: document.getElementById("quizScreen"),
    result: document.getElementById("resultScreen")
  };

  const state = {
    questions: [],
    answers: [],
    bookmarks: new Set(),
    currentIndex: 0,
    startedAt: 0,
    timerSeconds: 0,
    remainingSeconds: 0,
    timerId: null,
    submitted: false
  };

  const el = {
    startQuizButton: document.getElementById("startQuizButton"),
    heroStartButton: document.getElementById("heroStartButton"),
    headerStartButton: document.getElementById("headerStartButton"),
    quitButton: document.getElementById("quitButton"),
    previousButton: document.getElementById("previousButton"),
    nextButton: document.getElementById("nextButton"),
    submitButton: document.getElementById("submitButton"),
    bookmarkButton: document.getElementById("bookmarkButton"),
    questionCounter: document.getElementById("questionCounter"),
    answeredCounter: document.getElementById("answeredCounter"),
    quizProgressBar: document.getElementById("quizProgressBar"),
    quizCategoryLabel: document.getElementById("quizCategoryLabel"),
    quizDifficultyLabel: document.getElementById("quizDifficultyLabel"),
    questionType: document.getElementById("questionType"),
    questionText: document.getElementById("questionText"),
    questionContext: document.getElementById("questionContext"),
    answerList: document.getElementById("answerList"),
    timerDisplay: document.getElementById("timerDisplay"),
    scorePercentage: document.getElementById("scorePercentage"),
    scoreRing: document.getElementById("scoreRing"),
    correctCount: document.getElementById("correctCount"),
    incorrectCount: document.getElementById("incorrectCount"),
    unansweredCount: document.getElementById("unansweredCount"),
    timeTaken: document.getElementById("timeTaken"),
    resultTitle: document.getElementById("resultTitle"),
    resultMessage: document.getElementById("resultMessage"),
    reviewButton: document.getElementById("reviewButton"),
    newQuizButton: document.getElementById("newQuizButton"),
    reviewPanel: document.getElementById("reviewPanel"),
    closeReviewButton: document.getElementById("closeReviewButton"),
    reviewList: document.getElementById("reviewList"),
    savedBestScore: document.getElementById("savedBestScore"),
    savedTests: document.getElementById("savedTests"),
    savedAnswered: document.getElementById("savedAnswered"),
    resetProgressButton: document.getElementById("resetProgressButton"),
    toast: document.getElementById("toast")
  };

  function getCheckedValue(name) {
    const input = document.querySelector(`input[name="${name}"]:checked`);
    return input ? input.value : null;
  }

  function showScreen(name) {
    Object.values(screens).forEach(screen => screen.classList.remove("active"));
    screens[name].classList.add("active");
    screens[name].scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function formatLabel(value) {
    return value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ");
  }

  function formatTime(seconds) {
    const safe = Math.max(0, Math.floor(seconds));
    const minutes = Math.floor(safe / 60);
    const remaining = safe % 60;
    return `${minutes}:${String(remaining).padStart(2, "0")}`;
  }

  function showToast(message) {
    el.toast.textContent = message;
    el.toast.classList.add("show");
    window.clearTimeout(showToast.timeout);
    showToast.timeout = window.setTimeout(() => el.toast.classList.remove("show"), 1800);
  }

  function loadProgress() {
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKey) || "{}");
      return {
        tests: Number(parsed.tests) || 0,
        answered: Number(parsed.answered) || 0,
        best: Number(parsed.best) || 0
      };
    } catch {
      return { tests: 0, answered: 0, best: 0 };
    }
  }

  function updateProgressUI() {
    const progress = loadProgress();
    el.savedTests.textContent = progress.tests.toLocaleString();
    el.savedAnswered.textContent = progress.answered.toLocaleString();
    el.savedBestScore.textContent = `${progress.best}%`;
  }

  function saveProgress(score) {
    const progress = loadProgress();
    progress.tests += 1;
    progress.answered += state.questions.length;
    progress.best = Math.max(progress.best, score);
    localStorage.setItem(storageKey, JSON.stringify(progress));
    updateProgressUI();
  }

  function attachChoiceStyling(containerId) {
    const container = document.getElementById(containerId);
    container.addEventListener("change", event => {
      const input = event.target.closest("input");
      if (!input) return;
      container.querySelectorAll(".choice-card").forEach(card => card.classList.remove("selected"));
      const card = input.closest(".choice-card");
      if (card) card.classList.add("selected");
    });
  }

  function startQuiz() {
    const category = getCheckedValue("category");
    const difficulty = getCheckedValue("difficulty");
    const count = Number(getCheckedValue("questionCount"));
    const timer = Number(getCheckedValue("timer"));

    const ids = bank.randomQuestionIds({
      category,
      difficulty,
      count,
      seed: (Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0
    });

    state.questions = ids.map(id => bank.generateQuestion(id));
    state.answers = new Array(state.questions.length).fill(null);
    state.bookmarks = new Set();
    state.currentIndex = 0;
    state.startedAt = Date.now();
    state.timerSeconds = timer;
    state.remainingSeconds = timer;
    state.submitted = false;

    el.quizCategoryLabel.textContent = formatLabel(category);
    el.quizDifficultyLabel.textContent = formatLabel(difficulty);
    el.reviewPanel.classList.add("hidden");
    startTimer();
    renderQuestion();
    showScreen("quiz");
  }

  function startTimer() {
    stopTimer();
    if (!state.timerSeconds) {
      el.timerDisplay.textContent = "No timer";
      el.timerDisplay.classList.remove("warning");
      return;
    }

    updateTimerDisplay();
    state.timerId = window.setInterval(() => {
      state.remainingSeconds -= 1;
      updateTimerDisplay();
      if (state.remainingSeconds <= 0) {
        stopTimer();
        showToast("Time is up. Your test was submitted.");
        submitQuiz();
      }
    }, 1000);
  }

  function stopTimer() {
    if (state.timerId) {
      window.clearInterval(state.timerId);
      state.timerId = null;
    }
  }

  function updateTimerDisplay() {
    el.timerDisplay.textContent = formatTime(state.remainingSeconds);
    el.timerDisplay.classList.toggle("warning", state.remainingSeconds <= 60);
  }

  function renderQuestion() {
    const question = state.questions[state.currentIndex];
    const selected = state.answers[state.currentIndex];

    el.questionCounter.textContent = `Question ${state.currentIndex + 1} of ${state.questions.length}`;
    const answered = state.answers.filter(answer => answer !== null).length;
    el.answeredCounter.textContent = `${answered} answered`;
    el.quizProgressBar.style.width = `${((state.currentIndex + 1) / state.questions.length) * 100}%`;

    el.questionType.textContent = formatLabel(question.type).toUpperCase();
    el.questionText.textContent = question.question;
    el.bookmarkButton.classList.toggle("active", state.bookmarks.has(question.id));
    el.bookmarkButton.textContent = state.bookmarks.has(question.id) ? "★" : "☆";

    if (question.context) {
      el.questionContext.textContent = question.context;
      el.questionContext.classList.remove("hidden");
    } else {
      el.questionContext.textContent = "";
      el.questionContext.classList.add("hidden");
    }

    el.answerList.innerHTML = "";
    question.options.forEach((option, index) => {
      const label = document.createElement("label");
      label.className = `answer-option${selected === index ? " selected" : ""}`;
      label.innerHTML = `
        <input type="radio" name="answer" value="${index}" ${selected === index ? "checked" : ""}>
        <span class="answer-letter">${String.fromCharCode(65 + index)}</span>
        <span>${escapeHtml(option)}</span>
      `;
      label.addEventListener("change", () => {
        state.answers[state.currentIndex] = index;
        renderQuestion();
      });
      el.answerList.appendChild(label);
    });

    el.previousButton.disabled = state.currentIndex === 0;
    const isLast = state.currentIndex === state.questions.length - 1;
    el.nextButton.classList.toggle("hidden", isLast);
    el.submitButton.classList.toggle("hidden", !isLast);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function submitQuiz() {
    if (state.submitted) return;
    state.submitted = true;
    stopTimer();

    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    state.questions.forEach((question, index) => {
      const answer = state.answers[index];
      if (answer === null) unanswered += 1;
      else if (answer === question.correctIndex) correct += 1;
      else incorrect += 1;
    });

    const percentage = Math.round((correct / state.questions.length) * 100);
    const secondsUsed = state.timerSeconds
      ? state.timerSeconds - state.remainingSeconds
      : Math.floor((Date.now() - state.startedAt) / 1000);

    el.scorePercentage.textContent = `${percentage}%`;
    el.scoreRing.style.background = `conic-gradient(var(--primary) ${percentage * 3.6}deg, rgba(255,255,255,.07) 0deg)`;
    el.correctCount.textContent = correct;
    el.incorrectCount.textContent = incorrect;
    el.unansweredCount.textContent = unanswered;
    el.timeTaken.textContent = formatTime(secondsUsed);

    if (percentage >= 90) {
      el.resultTitle.textContent = "Outstanding!";
      el.resultMessage.textContent = "Excellent accuracy. You are ready for a harder challenge.";
    } else if (percentage >= 75) {
      el.resultTitle.textContent = "Great work!";
      el.resultMessage.textContent = "Your English foundation is strong. Review the few mistakes below.";
    } else if (percentage >= 50) {
      el.resultTitle.textContent = "Good progress";
      el.resultMessage.textContent = "You are improving. Review the explanations and try another test.";
    } else {
      el.resultTitle.textContent = "Keep practicing";
      el.resultMessage.textContent = "Every attempt helps. Review each answer and repeat the topic.";
    }

    buildReview();
    saveProgress(percentage);
    showScreen("result");
  }

  function buildReview() {
    el.reviewList.innerHTML = "";

    state.questions.forEach((question, index) => {
      const answerIndex = state.answers[index];
      const isCorrect = answerIndex === question.correctIndex;
      const status = answerIndex === null ? "unanswered" : isCorrect ? "correct" : "incorrect";
      const selectedText = answerIndex === null ? "Not answered" : question.options[answerIndex];

      const item = document.createElement("article");
      item.className = `review-item ${status}`;
      item.innerHTML = `
        <h4>${index + 1}. ${escapeHtml(question.question)}</h4>
        <p><strong>Your answer:</strong> ${escapeHtml(selectedText)}</p>
        <p><strong>Correct answer:</strong> ${escapeHtml(question.correctAnswer)}</p>
        <p><strong>Explanation:</strong> ${escapeHtml(question.explanation)}</p>
        <p><strong>Question ID:</strong> ${escapeHtml(question.bankLabel)}</p>
      `;
      el.reviewList.appendChild(item);
    });
  }

  function exitQuiz() {
    const hasAnswers = state.answers.some(answer => answer !== null);
    if (hasAnswers && !window.confirm("Exit this test? Your current answers will be lost.")) return;
    stopTimer();
    state.questions = [];
    state.answers = [];
    showScreen("setup");
  }

  el.startQuizButton.addEventListener("click", startQuiz);
  el.heroStartButton.addEventListener("click", () => document.getElementById("practice").scrollIntoView({ behavior: "smooth" }));
  el.headerStartButton.addEventListener("click", () => document.getElementById("practice").scrollIntoView({ behavior: "smooth" }));
  el.quitButton.addEventListener("click", exitQuiz);

  el.previousButton.addEventListener("click", () => {
    if (state.currentIndex > 0) {
      state.currentIndex -= 1;
      renderQuestion();
    }
  });

  el.nextButton.addEventListener("click", () => {
    if (state.currentIndex < state.questions.length - 1) {
      state.currentIndex += 1;
      renderQuestion();
    }
  });

  el.submitButton.addEventListener("click", () => {
    const unanswered = state.answers.filter(answer => answer === null).length;
    if (unanswered > 0) {
      const confirmed = window.confirm(`You still have ${unanswered} unanswered question${unanswered === 1 ? "" : "s"}. Submit anyway?`);
      if (!confirmed) return;
    }
    submitQuiz();
  });

  el.bookmarkButton.addEventListener("click", () => {
    const question = state.questions[state.currentIndex];
    if (state.bookmarks.has(question.id)) state.bookmarks.delete(question.id);
    else state.bookmarks.add(question.id);
    renderQuestion();
  });

  el.reviewButton.addEventListener("click", () => {
    el.reviewPanel.classList.remove("hidden");
    el.reviewPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  el.closeReviewButton.addEventListener("click", () => {
    el.reviewPanel.classList.add("hidden");
  });

  el.newQuizButton.addEventListener("click", () => showScreen("setup"));

  el.resetProgressButton.addEventListener("click", () => {
    if (!window.confirm("Reset all test progress saved in this browser?")) return;
    localStorage.removeItem(storageKey);
    updateProgressUI();
    showToast("Local progress has been reset.");
  });

  document.addEventListener("keydown", event => {
    if (!screens.quiz.classList.contains("active")) return;
    if (["1","2","3","4"].includes(event.key)) {
      const index = Number(event.key) - 1;
      if (index < state.questions[state.currentIndex].options.length) {
        state.answers[state.currentIndex] = index;
        renderQuestion();
      }
    }
    if (event.key === "ArrowRight" && state.currentIndex < state.questions.length - 1) {
      state.currentIndex += 1;
      renderQuestion();
    }
    if (event.key === "ArrowLeft" && state.currentIndex > 0) {
      state.currentIndex -= 1;
      renderQuestion();
    }
  });

  window.addEventListener("beforeunload", event => {
    if (screens.quiz.classList.contains("active") && state.questions.length && !state.submitted) {
      event.preventDefault();
      event.returnValue = "";
    }
  });

  attachChoiceStyling("categoryChoices");
  updateProgressUI();
})();
