const icecreams = require('./data/icescreams.json')

export default id => {
  return icecreams.find(item => item.id === id)
}
