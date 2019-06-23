import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

export default class LinkListItem extends PureComponent {
	render() {
		let { location, item, link, useId, className } = this.props
		console.log(location)
		return (

				<Link className={className ? className : ''} to={`${link ? link : location.pathname + '/'}${useId ? item._id : item.name}`}>
					{this.props.item.name}
				</Link>
		)
	}
}
