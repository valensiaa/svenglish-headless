export const arrayIntoChunks = (arr, chunkSize) => {
  const chunks = [];

  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    chunks.push(chunk);
  }
  if (chunks[chunks.length - 1].length < 4) {
    let lastArr = chunks[chunks.length - 2].concat(chunks[chunks.length - 1]);
    chunks.pop();
    chunks.push(lastArr);
  }

  return chunks;
};
