export class Quiz {
  constructor(questions) {
    //console.log(questions);
    this.questions = questions;
    this.currentQuestion = 0;
    this.numOfQuestions = this.questions.length;
    this.score = 0;
    this.showQuestions();
    document
      .getElementById("next")
      .addEventListener("click", this.nextQuestion.bind(this));
    document.getElementById("tryBtn").addEventListener("click", () => {
      $("#finish").fadeOut(500, () => {
        $("#setting").fadeIn(500);
      });
      $("#numberOfQuestions").val(""); // to reset the value of the input when you click try again
    });
  }

  shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  showQuestions() {
    document.getElementById("currentQuestion").innerHTML =
      this.currentQuestion + 1;
    document.getElementById(
      "totalNumberOfQuestions"
    ).innerHTML = this.numOfQuestions;

    let correctAnswer = this.questions[this.currentQuestion].correct_answer;
    let inCorrectAnswer = this.questions[this.currentQuestion]
      .incorrect_answers;
    let answers = [correctAnswer, ...inCorrectAnswer]; // to reach the incorrect in the array
    console.log(answers);
    this.shuffle(answers);
    console.log(answers);

    document.getElementById("question").innerHTML = this.questions[
      this.currentQuestion
    ].question;
    var blackBox = ``;
    for (var i = 0; i < answers.length; i++) {
      blackBox += ` 
  <label class="form-check-label">
  <input type="radio" class="form-check-input" name="answer" id="easy" value="${answers[i]}"
      >
  ${answers[i]}
  </label><br/>
  `;
    }

    document.getElementById("rowAnswer").innerHTML = blackBox;
  }

  nextQuestion() {
    
    if (Array.from(document.getElementsByName("answer")).filter((ele)=>ele.checked).length > 0) {



      let correctAnswer = this.questions[this.currentQuestion].correct_answer;
      let userAnswer = Array.from(document.getElementsByName("answer")).filter(
        (ele) => ele.checked
      )[0].value;
      this.checkAnswer(userAnswer, correctAnswer);

      console.log(
        Array.from(document.getElementsByName("answer")).filter(
          (ele) => ele.checked
        )[0].value
      );
      this.currentQuestion++;

      if (this.currentQuestion < this.numOfQuestions) {
        this.showQuestions();
      } else {
        $("#quiz").fadeOut(500, () => {
          $("#finish").fadeIn(500);
        });
        document.getElementById("score").innerHTML = this.score;
      }
    } else {
      $("#alert").fadeIn(1000).fadeOut(1000);
    }
  }

  checkAnswer(userAnswer, correctAnswer) {
    if (userAnswer == correctAnswer) {
      this.score++;

      $("#Correct").fadeIn(700).fadeOut(600);
    } else {
      $("#inCorrect").fadeIn(700).fadeOut(600);
    }
    console.log(this.score);
  }
}
