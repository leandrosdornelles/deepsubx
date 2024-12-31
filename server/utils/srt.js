export function parseSRT(content) {
    const blocks = content.trim().split('\n\n');
    return blocks.map((block) => {
      const [id, timeCode, ...textLines] = block.split('\n');
      const [startTime, endTime] = timeCode.split(' --> ');
      return {
        id: parseInt(id),
        startTime,
        endTime,
        text: textLines.join('\n'),
      };
    });
  }
  
  export function stringifySRT(subtitles) {
    return subtitles
      .map(
        (sub) =>
          `${sub.id}\n${sub.startTime} --> ${sub.endTime}\n${sub.text}\n`
      )
      .join('\n');
  }