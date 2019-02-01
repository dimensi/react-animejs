import React from 'react'
import { AnimeContext } from './AnimeContext'
import PropTypes from 'prop-types'

export class Animated extends React.PureComponent {
  static contextType = AnimeContext
  static propTypes = {
    tag: PropTypes.string,
    children: PropTypes.any,
  }

  el = React.createRef()

  componentDidMount () {
    this.context.addTarget(this.el.current)
  }
  componentWillUnmount () {
    this.context.removeTarget(this.el.current)
  }

  render () {
    const { tag, ...props } = this.props
    const Tag = tag
    return <Tag {...props} ref={this.el} />
  }
}
