import React from 'react'
import Liste from '../home/Liste'
import Navigation_bar from '../home/Navigation_bar'
import PC_header from '../home/PC_header'

function Historique_voiture() {
  return (
    <div>
      <Navigation_bar />
      <PC_header />

        <div>
            <h1 className='text-center mt-10 text-2xl '>Historique </h1>
            <Liste />
        </div>
    </div>
  )
}

export default Historique_voiture