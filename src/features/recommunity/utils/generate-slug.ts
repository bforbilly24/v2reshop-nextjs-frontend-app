/**
 * Generate URL-safe slug from community name
 * Example: "Komunitas Dokter Indonesia" → "komunitas-dokter-indonesia"
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores with single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

/**
 * Generate slug with ID for uniqueness
 * Example: "Komunitas Dokter Indonesia" with ID 1 → "komunitas-dokter-indonesia-1"
 */
export function generateSlugWithId(name: string, id: number): string {
  const slug = generateSlug(name)
  return `${slug}-${id}`
}

/**
 * Extract ID from slug
 * Example: "komunitas-dokter-indonesia-1" → 1
 */
export function extractIdFromSlug(slug: string): number | null {
  const parts = slug.split('-')
  const lastPart = parts[parts.length - 1]
  const id = parseInt(lastPart, 10)
  return isNaN(id) ? null : id
}
