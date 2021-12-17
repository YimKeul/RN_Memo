import React from 'react'
import { TouchableOpacity , StyleSheet , Image} from 'react-native'
import {images} from '../images'
import { theme } from '../theme'

const IconButton = ({type, onPressOut , id , completed}) => {
  const _onPressOut = () =>{
    onPressOut(id)
  }
  return(
    <TouchableOpacity onPressOut={_onPressOut}>


      {/* {completed === true ?  <Image source={type} completed={completed} style={styles.UnIcon}/> :
      <Image source={type} completed={completed} style={styles.Icon}/> } */}

  <Image source={type} completed={completed} style={{...styles.Icon, tintColor : completed ? theme.done : theme.text}}/>

    </TouchableOpacity>
  )

}

const styles = StyleSheet.create({
  Icon :{
    tintColor : theme.text,
    width : 30,
    height : 30,
    margin :10
  },
  UnIcon:{
    tintColor : theme.done,
    width : 30,
    height : 30,
    margin :10
  }
})
export default IconButton