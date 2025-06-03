const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault()
  const targetId = 'categories-slider'
  const targetElement = document.getElementById(targetId)
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' })
  }
}

export { handleSmoothScroll }
