const createNextProject = require('./create-next-project')
const createReactNativeProject = require('./create-react-native-project')
const createReactProject = require('./create-react-project')
const templates = require('./utils/templates')

// Utils
const types = require('./utils/types')

const verifyType = async (type) => {
  const selectedType = types.indexOf(type)

  switch (selectedType) {
    case 0:
      return createReactProject(type)
    case 1:
      return createReactProject(type, templates[0])
    case 2:
      return createReactProject(type, templates[1])
    case 3:
      return createReactProject(type, templates[2])
    case 4:
      return createNextProject(type, templates[3])
    case 5:
      return createReactNativeProject(type, templates[0])
    case 6:
      return createReactNativeProject(type, templates[4])
  }
}

module.exports = {
  verifyType
}