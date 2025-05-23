
import * as readline from 'readline';

export const leitorLinha = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export function fazerPergunta(pergunta: string): Promise<string> {
  return new Promise(resolve => leitorLinha.question(pergunta, resolve));
}
