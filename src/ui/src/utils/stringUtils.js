/**
 * Escapes special characters in a string with their regex escape codes.
 *
 * @param {string} value - The string to escape.
 * @returns {string} - The escaped string.
 */
export function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
