/**
 * Validation utilities for data validation
 */

/**
 * Validates if a string is a valid UUID (version 4)
 *
 * @param value - The string to validate
 * @returns true if the string is a valid UUID, false otherwise
 *
 * @example
 * isValidUUID('550e8400-e29b-41d4-a716-446655440000') // true
 * isValidUUID('test-2') // false
 * isValidUUID('not-a-uuid') // false
 */
export function isValidUUID(value: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}
