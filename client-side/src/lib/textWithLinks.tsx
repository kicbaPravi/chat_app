export const textWithLinks = (text: string): JSX.Element => {
  const urlRegex =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
  const words = text.split(' ');

  return (
    <p>
      {words.map((word) => {
        return word.match(urlRegex) ? (
          <>
            <a href={word} target="_blank" rel="noreferrer">
              {word}
            </a>{' '}
          </>
        ) : (
          word + ' '
        );
      })}
    </p>
  );
};
