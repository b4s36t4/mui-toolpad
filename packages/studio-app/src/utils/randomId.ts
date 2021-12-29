const ID_CHAR_FIRST = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const ID_CHAR_REST = `${ID_CHAR_FIRST}0123456789`;
const ID_LENGTH = 12;

function randomIndex(length: number): number {
  return typeof crypto !== 'undefined'
    ? crypto.getRandomValues(new Uint8Array(1))[0] % length
    : Math.floor(Math.random() * length);
}

function randomChar(chars: string): string {
  return chars[randomIndex(chars.length)];
}

export function generateRandomId(): string {
  let id = randomChar(ID_CHAR_FIRST);
  for (let i = 0; i < ID_LENGTH - 1; i += 1) {
    id += randomChar(ID_CHAR_REST);
  }
  return id;
}

export function generateUniqueId(exclude: Set<string>): string {
  let id = generateRandomId();
  while (exclude.has(id)) {
    id = generateRandomId();
  }
  return id;
}
