export function mapSoapError(error: unknown): Error {
  const originalMessage = error instanceof Error ? error.message : String(error);
  const lowerMessage = originalMessage.toLowerCase();

  if (
    lowerMessage.includes('enotfound') ||
    lowerMessage.includes('econnrefused') ||
    lowerMessage.includes('etimedout') ||
    lowerMessage.includes('socket hang up')
  ) {
    return new Error('Could not connect to SIFEN endpoint.');
  }

  return new Error(`SIFEN request failed: ${originalMessage}`);
}
