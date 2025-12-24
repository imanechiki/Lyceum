import sharp from 'sharp'

/**
 * Checks if a file is an image that should be converted to WebP
 */
export function isConvertibleImage(mimeType: string): boolean {
  const convertibleTypes = ['image/jpeg', 'image/jpg', 'image/png']
  return convertibleTypes.includes(mimeType.toLowerCase())
}

/**
 * Converts an image buffer to WebP format
 * @param buffer - The original image buffer
 * @param quality - WebP quality (1-100, default: 85)
 * @returns WebP buffer
 */
export async function convertImageToWebP(buffer: Buffer, quality: number = 85): Promise<Buffer> {
  try {
    return await sharp(buffer).webp({ quality, effort: 6 }).toBuffer()
  } catch (error) {
    console.error('Error converting image to WebP:', error)
    throw new Error('Failed to convert image to WebP format')
  }
}

/**
 * Changes file extension to .webp
 */
export function changeExtensionToWebP(filename: string): string {
  const lastDotIndex = filename.lastIndexOf('.')
  if (lastDotIndex === -1) {
    return `${filename}.webp`
  }
  return `${filename.substring(0, lastDotIndex)}.webp`
}
