import { nanoid } from 'nanoid';

function generatePassword(length: number = 12): string {
  return nanoid(length);
}

console.log(generatePassword());

console.log(generatePassword(20));