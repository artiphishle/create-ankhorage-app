import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Surface } from 'react-native-paper'
import Video, { type ReactVideoProps } from 'react-native-video'

const VideoPlayer = (props: ReactVideoProps) => {
  return (
    <Surface style={styles.container}>
      <Video
        {...props}
        style={styles.video}
        resizeMode="contain" // Adjusts video aspect ratio
        controls // Show video controls
      />
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1, // Ensure the container takes up the full screen
  },
  video: {
    width: '100%', // Full width of the parent
    height: Dimensions.get('window').height / 2, // Half the screen height
  },
})

export default VideoPlayer
