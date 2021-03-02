import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Corusel from './components/Corusel'

function App () {
  return (
    <Corusel>
      {[
        {
          html: `
            <img src="https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="bg"/>
            <p>LANDSCAPE</p>
          `
        },
        {
          html: `
            <img src="https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="bg"/>
            <p>GALAXY</p>
          `
        },
        {
          html: `
            <img src="https://images.pexels.com/photos/844297/pexels-photo-844297.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="bg"/>
            <p>SKY</p>
          `
        }
      ]}
    </Corusel>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)