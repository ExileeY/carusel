import React from 'react'

function useSlide(maxElement) {
  const [slideIndex, setSlideIndex] = React.useState(0)
  const [slideEffect, setSlideEffect] = React.useState(null)

  React.useEffect(() => {
    const id = window.setTimeout(() => {
      setSlideEffect(null)
    }, 300)

    return () => {
      window.clearTimeout(id)
    }
  }, [slideIndex])

  const increment = () => {
    setSlideIndex(slideIndex => slideIndex === maxElement ? 0 : ++slideIndex)
    setSlideEffect({
      position: 'absolute',
      left: '100%',
      animation: 'slide 0.3s forwards',
      animationDelay: '0s'
    })
  }

  const decrement = () => {
    setSlideIndex(slideIndex => slideIndex === 0 ? maxElement : --slideIndex)
    setSlideEffect({
      position: 'absolute',
      left: '-100%',
      animation: 'slide 0.3s forwards',
      animationDelay: '0s'
    })
  }

  const slide = {
    index: slideIndex,
    effect: slideEffect
  }

  const attrs = {
    increment: () => increment(),
    decrement
  }

  return [slide, attrs]
}

export default function Corusel ({children}) {
  const [slide, attrs] = useSlide(children.length - 1)
  const [infMode, setInfMode] = React.useState(false)
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);

  React.useEffect(() => {
    if (infMode === false) {
      window.clearInterval(id)
    } else {
      var id = window.setInterval(() => {
        attrs.increment()
      }, 3000)
    }

    return () => {
      window.clearInterval(id)
    }
  }, [infMode])

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 150) {
      attrs.increment()
    }

    if (touchStart - touchEnd < -150) {
      attrs.decrement()
    }
  }

  return (
    <>
      <div className="slide-body" style={slide.effect} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <div className="slide-body__content" dangerouslySetInnerHTML={{__html: children[slide.index].html}}/>
      </div>
      <div className="options">
        <input id="mode" type='checkbox'/>
        <label htmlFor="mode" onClick={() => setInfMode(infMode => infMode === true ? false : true)}>Infinity mode</label>
      </div>
      <button className="btn-prev btn-clear btn-light" onClick={attrs.decrement}>←</button>
      <button className="btn-next btn-clear btn-light" onClick={attrs.increment}>→</button>
    </>
  )
} 