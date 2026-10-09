import { imageProps, photos, type Photo } from '../photos'

export default function Picture({
  name,
  sizes,
  className = '',
  eager = false,
}: {
  name: Photo['name']
  sizes: string
  className?: string
  eager?: boolean
}) {
  const alt = photos.find((p) => p.name === name)?.alt ?? ''
  return (
    <img
      {...imageProps(name, sizes)}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
    />
  )
}
