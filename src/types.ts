export type NBAPlayer = {
  id: number;
  name: string;
  height: string;
  weight: number;
  country: string;
  college: string;
  team: string;
  position: string;
};

export type GuessingAccuracy = 'correct' | 'incorrect' | 'partial';

export type GuessingResult = {
  name: {
    value: string;
    correct: GuessingAccuracy;
  };
  height: {
    value: string;
    correct: GuessingAccuracy;
  };
  weight: {
    value: number;
    correct: GuessingAccuracy;
  };
  country: {
    value: string;
    correct: GuessingAccuracy;
  };
  college: {
    value: string;
    correct: GuessingAccuracy;
  };
  team: {
    value: string;
    correct: GuessingAccuracy;
  };
  position: {
    value: string;
    correct: GuessingAccuracy;
  };
};
