export function mapSoapError(error: unknown): Error {
  const originalMessage = error instanceof Error ? error.message : String(error);
  const lowerMessage = originalMessage.toLowerCase();

  if (
    lowerMessage.includes('enotfound') ||
    lowerMessage.includes('econnrefused') ||
    lowerMessage.includes('etimedout') ||
    lowerMessage.includes('socket hang up')
  ) {
    return new Error('No se pudo conectar a endpoint de SIFEN.');
  }

  return new Error(`Error de request SIFEN: ${originalMessage}`);
}
