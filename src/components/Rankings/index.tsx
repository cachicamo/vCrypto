import React from 'react'
import { View, Text, Image } from 'react-native'

import styles from './styles'

export interface RankingsProps {
  rankings: {
    id: string,
    image: string,
    name: string,
    netWorth: number,
  },
  place: number, 
}

const Rankings = (props: RankingsProps) => {
  const {
    rankings: {
      id,
      image, 
      name, 
      netWorth,
    },
    place,
  } = props;

  return (
    <View style={styles.root}>
      <View style={styles.leftContainer}>
        <Text style={styles.place}>{place}</Text>
        <Image style={styles.image} source={{uri: image}} />
        <View>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text style={styles.netWorth}>${netWorth.toFixed(2)}</Text>
      </View>
    </View>
  )
}

export default Rankings
