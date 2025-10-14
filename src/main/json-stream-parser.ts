export class JsonStreamParser {
  private buffer: string = '';

  /**
   * Processes an incoming chunk of data and returns an array of any complete JSON objects found.
   * @param chunk A new chunk of data from the stream.
   * @returns An array of parsed JavaScript objects.
   */
  public push(chunk: string): object[] {
    this.buffer += chunk;
    const parsedObjects: object[] = [];

    while (true) {
      const result = this.extractNextObject();
      if (result.jsonObject) {
        parsedObjects.push(result.jsonObject);
        // Update the buffer to what's left after extracting the object
        this.buffer = result.remainingBuffer;
      } else {
        // No complete object was found, so we stop and wait for more data
        break;
      }
    }
    return parsedObjects;
  }

  /**
   * Tries to find and parse the first complete JSON object in the buffer.
   */
  private extractNextObject(): { jsonObject: object | null; remainingBuffer: string } {
    const startIndex = this.buffer.indexOf('{');
    if (startIndex === -1) {
      // If there's no '{' in the buffer, we can't do anything.
      return { jsonObject: null, remainingBuffer: this.buffer };
    }

    let braceCount = 0;
    let endIndex = -1;

    // Start searching from the first '{' found
    for (let i = startIndex; i < this.buffer.length; i++) {
      if (this.buffer[i] === '{') {
        braceCount++;
      } else if (this.buffer[i] === '}') {
        braceCount--;
      }
      
      if (braceCount === 0) {
        // We found the matching closing brace
        endIndex = i;
        break;
      }
    }

    if (endIndex === -1) {
      // The object is still incomplete, wait for more data
      return { jsonObject: null, remainingBuffer: this.buffer };
    }

    // Extract the full object string and the remainder of the buffer
    const objectString = this.buffer.substring(startIndex, endIndex + 1);
    const remainingBuffer = this.buffer.substring(endIndex + 1);

    try {
      const jsonObject = JSON.parse(objectString);
      return { jsonObject, remainingBuffer };
    } catch (error) {
      // The data between the braces was not valid JSON.
      // This is where your previous error was caught.
      console.error('[Parser] Discarding corrupted data fragment:', objectString, error);
      // We discard the corrupt fragment and continue with the rest of the buffer.
      return { jsonObject: null, remainingBuffer: remainingBuffer };
    }
  }
}