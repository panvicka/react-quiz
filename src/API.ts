import QuestionCard from "./components/QuestionCard";
import { shuffleArray } from "./utils";

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

// new type with base of questions + with array of all answers
export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const fetchQuizQuestions = async (
  amount: number,
  difficult: Difficulty
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficult}&type=multiple`;
  const data = await (await fetch(endpoint)).json();

  return data.results.map((question: Question) => {
    const objectToReturn = {
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    };
   

    return objectToReturn;
  });

  console.log(data);
};
