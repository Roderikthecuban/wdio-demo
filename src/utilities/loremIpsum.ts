import { LoremIpsum } from "lorem-ipsum";

export const lorem = new LoremIpsum({
  wordsPerSentence: {
    max: 10,
    min: 5,
  },
});

export const getSentence = (): string => {
  return lorem.generateSentences(1);
};
