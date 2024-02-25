export const getYoutubeIdFromUrl = (youtubeUrl) => {
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = youtubeUrl.match(regExp);

  if (match && match[2].length === 11) {
    return match[2];
  } else {
    return false;
  }
};
