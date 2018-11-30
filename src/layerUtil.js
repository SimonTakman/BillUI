export const hasArtboards = layers => {
  return layers.filter(layer => layer.type === 'Artboard').length > 0 ? true : false 
}

export const getArtboards = layers => {
  return layers.filter(layer => layer.type === 'Artboard')
}

export const hasGroups = layers => {
  return layers.filter(layer => layer.type === 'Group').length > 0 ? true : false
}

export const getGroups = layers => {
  return layers.filter(layer => layer.type === 'Group')
}

export const hasShapePaths = layers => {
  return layers.filter(layer => layer.type === 'ShapePath').length > 0 ? true : false
}

export const getShapePaths = layers =>{
  return layers.filter(layer => layer.type = 'ShapePath')
}