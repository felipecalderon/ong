export const optimizeImg = (HTMLImg: HTMLImageElement) => {
    const maxWidth = 800
    const scaleRatio = maxWidth / HTMLImg.width
    const newWidth = HTMLImg.width > maxWidth ? maxWidth : HTMLImg.width
    const newHeight = HTMLImg.width > maxWidth ? HTMLImg.height * scaleRatio : HTMLImg.height

    const canvas = document.createElement('canvas')
    canvas.width = newWidth
    canvas.height = newHeight

    const ctx = canvas.getContext('2d')
    ctx?.drawImage(HTMLImg, 0, 0, newWidth, newHeight)

    // Comprimir a JPEG con calidad del 75%
    return canvas.toDataURL('image/jpeg', 0.75)
}
