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
  return layers.filter(layer => layer.type === 'ShapePath')
}

export const getText = layers => {
  return layers.filter(layer => layer.type === "Text")
}

export const sortTextDescendingOrder = layers => {
  return layers.sort((a,b) => b.name.length - a.name.length)
}

export const getTextElementByValue = (layers, text) => {
  return layers.filter(layer => layer.name === text)
}

export const hasTextElementByValue = (layers, text) => {
  return layers.filter(layer => layer.name === text).length > 0 ? true : false
}

export function getShape(selectedLayers){
  let layers = getGroups(selectedLayers.layers)
  if (layers.length > 0){
    //THIS IS A GROUP
    return {"layers": layers, "type": layers[0].type}
  } else {
    layers = getShapePaths(selectedLayers.layers)
    if(layers.length > 0){
      return {"layers": layers, "type": layers[0].type}
      // THIS IS A SHAPEPATH
      //sketch.UI.message("This is a shapepath")
    }
  }
  return null
}