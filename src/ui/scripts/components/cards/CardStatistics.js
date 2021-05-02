import { createElement as h, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Headline from '../Headline'
import Text from '../Text'
import Status, { ICON_LOADER, ICON_UPDATER } from '../Status'
import Tooltip from '../Tooltip'
import status from '../../utils/status'

const CardStatistics = (props) => {

	const { value, fetching } = props.hook(...props.hookArgs)

	const {
		isInitializing,
		isUpdating,
		isEmpty
	} = status(value, fetching)

	// Use thin space as initial value to avoid that the label changes the height once rendered
	const [ statusLabel, setStatusLabel ] = useState(' ')

	const currentStatus = (() => {
		if (isInitializing === true) return h(Status, {
			icon: ICON_LOADER
		}, 'Loading')

		if (isUpdating === true) return h(Status, {
			icon: ICON_UPDATER
		}, 'Updating')

		if (isEmpty === true) return h(Status, {},
			'No data',
			h(Tooltip, {}, 'There is either no data available or collecting detailed data is disabled in ackee-tracker.')
		)

		return h(Status, {}, statusLabel)
	})()

	return (
		h('div', {
			className: classNames({
				'card': true,
				'card--wide': props.wide === true
			})
		},
			h('div', { className: 'card__inner' },
				h(Headline, {
					type: 'h2',
					size: 'medium',
					onClick: props.onMore
				}, props.headline),
				h(Text, {
					type: 'div',
					spacing: false
				}, currentStatus),
				h(props.renderer, {
					...props.rendererProps,
					items: value,
					setStatusLabel
				})
			)
		)
	)

}

CardStatistics.propTypes = {
	wide: PropTypes.bool,
	headline: PropTypes.string.isRequired,
	onMore: PropTypes.func,
	hook: PropTypes.func.isRequired,
	hookArgs: PropTypes.array.isRequired,
	renderer: PropTypes.elementType.isRequired,
	rendererProps: PropTypes.object
}

export default CardStatistics