import React from 'react'
import { Anime } from './Anime'

export const StateAnimation = states => {
  const comp = ({ state, ...props }) => {
    const currentState = states[state]
    return <Anime {...currentState} {...props} />
  }
  comp.displayName = `StateAnimationWithStates(${Object.keys(states).join(',')})`
  return comp
}
