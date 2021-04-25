import { useMutation, gql } from '@apollo/client'

import deleteIdModify from '../utils/deleteIdModify'

const DELETE_EVENT = gql`
	mutation deleteEvent($id: ID!) {
		deleteEvent(id: $id) {
			success
		}
	}
`

const update = (id) => (cache) => {
	cache.modify({
		fields: {
			domains: deleteIdModify(id)
		}
	})
}

export default (id) => {

	const [ mutate, { loading: fetching, error }] = useMutation(DELETE_EVENT, {
		variables: {
			id
		}
	})

	return {
		mutate: (opts) => mutate({
			update: update(id),
			...opts
		}),
		fetching,
		error
	}

}