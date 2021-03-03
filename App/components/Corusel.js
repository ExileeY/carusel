import React from 'react'

function reducer (state, action) {
  if (action.type === 'increment') {
    return state === action.maxIndex ? 0 : state + 1
  }
  else if (action.type === 'decrement') {
    return state === 0 ? action.maxIndex : state - 1
  }
}

export default function Corusel ({children}) {
  const [state, dispatch] = React.useReducer(reducer, 0)
  const [slideEffect, setSlideEffect] = React.useState(null)
  const [infMode, setInfMode] = React.useState(false)
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);

  React.useEffect(() => {
    const id = window.setTimeout(() => {
      setSlideEffect(null)
    }, 300)

    return () => {
      window.clearTimeout(id)
    }
  }, [state])

  const increment = () => {
    dispatch({type: 'increment', maxIndex: children.length - 1})
    setSlideEffect({
      position: 'absolute',
      left: '100%',
      animation: 'slide 0.3s forwards',
      animationDelay: '0s'
    })
  }

  React.useEffect(() => {
    if (infMode === false) {
      window.clearInterval(id)
    } else {
      var id = window.setInterval(() => {
        increment()
      }, 3000)
    }

    return () => {
      window.clearInterval(id)
    }
  }, [infMode])

  const decrement = () => {
    dispatch({type: 'decrement', maxIndex: children.length - 1})
    setSlideEffect({
      position: 'absolute',
      left: '-100%',
      animation: 'slide 0.3s forwards',
      animationDelay: '0s'
    })
  }

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 150) {
      increment()
    }

    if (touchStart - touchEnd < -150) {
      decrement()
    }
  }

  return (
    <>
      <div className="slide-body" style={slideEffect} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <div className="slide-body__content" dangerouslySetInnerHTML={{__html: children[state].html}}/>
      </div>
      <div className="options">
        <input id="mode" type='checkbox'/>
        <label htmlFor="mode" onClick={() => setInfMode(infMode => infMode === true ? false : true)}>Infinity mode</label>
      </div>
      <button className="btn-prev btn-clear btn-light" onClick={decrement}>←</button>
      <button className="btn-next btn-clear btn-light" onClick={increment}>→</button>
    </>
  )
} 