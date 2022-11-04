import tripsReducer from './tripsSlice'

test('Creates new test', () => {
   const action = { type: 'trips/tripAdded', payload: 'test'}
   const result = tripsReducer([], action)
   expect(result[0].name).toBe(action.payload)
})