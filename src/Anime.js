import React from 'react'
import { AnimeContext } from './AnimeContext'
import PropTypes from 'prop-types'
import animejs from 'animejs'

export class Anime extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any,
  }

  addTarget = target => {
    const oldTargets = this.targets
    this.targets = [...oldTargets, target]
    if (!this.isMounted) return
    this.createAnimation(this.targets, oldTargets)
  }

  removeTarget = target => {
    this.targets = this.targets.filter(el => el !== target)
    animejs.remove(target)
  }

  targets = []
  isMounted = false
  animeInstance = null

  createAnimation = (targets, oldTargets) => {
    if (this.animeInstance) {
      animejs.remove(oldTargets)
      this.animeInstance = null
    }
    const { children, ...params } = this.props
    this.animeInstance = animejs({
      targets,
      ...params,
    })
  }

  updateAnimation = params => {
    if (this.animeInstance) {
      animejs.remove(this.targets)
    }
    this.animeInstance = animejs({
      targets: this.targets,
      ...params,
    })
  }

  componentDidMount () {
    this.createAnimation(this.targets, [])
    this.isMounted = true
  }

  componentWillReceiveProps (nextProps) {
    const { children, ...params } = nextProps
    this.updateAnimation(params)
  }

  componentWillUnmount () {
    if (this.animeInstance) {
      animejs.remove(this.targets)
      this.animeInstance = null
    }
  }

  render () {
    const {
      addTarget,
      removeTarget,
      props: { children },
    } = this
    return (
      <AnimeContext.Provider value={{ addTarget, removeTarget }}>{children}</AnimeContext.Provider>
    )
  }
}
