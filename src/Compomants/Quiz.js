import React, { useState } from "react";
import QuizData from "./QuizData";


function Quiz() {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(QuizData[0]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const checkAns = (e, ans) => {
    if (lock) {
      return;
    }

    if (question.answer === ans + 1) {
      e.target.classList.add("correct");
      setLock(true);
      setScore((prevScore) => prevScore + 1);
    } else {
      e.target.classList.add("wrong");
      setLock(true);
    }
  };

  const resetStyles = () => {
    const options = document.querySelectorAll(".option li");
    options.forEach((option) => {
      option.classList.remove("correct", "wrong");
    });
  };

  const next = () => {
    if (lock === true) {
      resetStyles();
      if (index + 1 < QuizData.length) {
        setIndex((prevIndex) => prevIndex + 1);
        setQuestion(QuizData[index + 1]);
        setLock(false);
      } else {
        setQuizFinished(true);
      }
    }
  };

  const resetQuiz = () => {
    setIndex(0);
    setQuestion(QuizData[0]);
    setLock(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="quiz_body">
      <div className="container">
        <h1>Quiz App</h1>
        <hr />
        {!quizFinished ? (
          <>
            <h1>
              {index + 1}.{question.question}
            </h1>
            <div className="option">
              <ul>
                {question.options.map((o, i) => (
                  <li
                    key={i}
                    onClick={(e) => {
                      checkAns(e, i);
                    }}
                  >
                    {" "}
                    {o}
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={next}>Next</button>
            <div className="index">
              {index + 1} of {QuizData.length}
            </div>
          </>
        ) : (
          <>
            <h2>Quiz Finished!</h2>
            <p>Your Score: {score}</p>
            <button onClick={resetQuiz}>Restart Quiz</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Quiz;
