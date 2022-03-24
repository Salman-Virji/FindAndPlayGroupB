const getImage = function(name) {
        const IMAGES = {
          squirrel: require('../../assets/images/red-squirrel.jpg'),
          tree: require('../../assets/images/tree.jpg'),
          bird: require('../../assets/images/bird.jpg'),
          cat: require('../../assets/images/cat.jpg'),
      }
    
    return IMAGES[name];
}
export default getImage
