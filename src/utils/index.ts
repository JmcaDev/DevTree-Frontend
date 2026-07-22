export function classNames(...classes : string[]) {
  return classes.filter(Boolean).join(' ')
}

export function isValidUrl(url: string){

  if(!url || typeof url !== 'string') return false

  const pattern = /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}/

  if(!pattern.test(url)) return false

  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}