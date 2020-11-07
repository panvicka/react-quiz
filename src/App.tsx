import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
//components
import QuestionCard from "./components/QuestionCard";
//types
import { QuestionState, Difficulty } from "./API";
//styles
import { GlobalStyle, Wrapper } from "./App.style";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [quizEnd, setQuizEnd] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setQuizEnd(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!quizEnd) {
      const answer = e.currentTarget.value;

      const correct = questions[number].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const next = number + 1;
    if (next === TOTAL_QUESTIONS) {
      setQuizEnd(true);
    } else {
      setNumber(next);
    }
  };

  //console.log(fetchQuizQuestions(10, Difficulty.EASY));

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>Quiz</h1>
        {quizEnd || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startQuiz}>
            Start
          </button>
        ) : null}
        {!quizEnd ? <p className="score">Score: {score}</p> : null}
        {loading && <p>Loading...</p>}
        {!loading && !quizEnd && (
          <QuestionCard
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          ></QuestionCard>
        )}

        {!quizEnd &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            next
          </button>
        ) : null}
        </Wrapper>
    </>
  );
}

export default App;
