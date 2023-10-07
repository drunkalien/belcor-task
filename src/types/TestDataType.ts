export type Choice = {
  id: string;
  choice: string;
  isCorrect: boolean;
};

export type Question = {
  id: number;
  question: string;
  choices: Choice[];
  correctAnswer: string;
};

export type TestData = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
};
