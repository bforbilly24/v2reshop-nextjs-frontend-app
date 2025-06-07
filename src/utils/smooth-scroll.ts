const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault()
  const targetId = 'about'
  const targetElement = document.getElementById(targetId)
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' })
  }
}

export { handleSmoothScroll }
