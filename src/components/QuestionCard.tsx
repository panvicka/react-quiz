import React, { useRef } from "react";
import { AnswerObject } from "../App";
import "./QuestionCard.css";

// becauase of typescript we need type for props
type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
};

//this is a functional component
const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => {
  const answerButton = useRef(null);

  if (userAnswer !== undefined) {
    if (userAnswer.correct === true) {
      if (answerButton === null) {
        
      } else {
          if (answerButton.current === null) { 
       
          } else {
            console.log(answerButton?.current);
          }
      }
    } else {
    }
  }

  return (
    <>
      <div className="question">
        <p>
          Question: {questionNumber} of {totalQuestions}
        </p>
        <div className="question-body">
          <p dangerouslySetInnerHTML={{ __html: question }}></p>
        </div>
        <div>
          {answers.map((answer) => {
            return (
              <div key={answer}>
                <button
                  disabled={!!userAnswer}
                  value={answer}
                  onClick={callback}
                  ref={answerButton}
                >
                  <span dangerouslySetInnerHTML={{ __html: answer }}></span>
                </button>
              </div>
            );
          })}
          {userAnswer ? (
            userAnswer.correct ? (
              <p>correct</p>
            ) : (
              <p>false</p>
            )
          ) : null}
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
