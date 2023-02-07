import { Text, TouchableOpacity, Image, View } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faLocation, faLocationPin, faLocationPinLock, faMapLocation, faStar } from '@fortawesome/free-solid-svg-icons'
import { urlFor } from '../sanity'
import { useNavigation } from '@react-navigation/native'

const RestaurantCards = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat
}) => {

  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Restaurant', {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat
        })
      }}
      className="bg-white mr-3 shadow">
      <Image style={{ minWidth: "100%" }} source={{
        //this urlFor is a function bringed from sanity.js
        //means that takes a source as parameter and make it a valid url to use it as image
        url: urlFor(imgUrl).url()
      }}
        className="h-36 w-64 rounded-sm"
      />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <FontAwesomeIcon color='green' icon={faStar} />
          <Text>{rating} - {genre}</Text>
        </View>
        <View className="flex-row items-center space-x-2">
          <FontAwesomeIcon color="gray" icon={faMapLocation} />
          <Text className="text-gray-500">Nearby - {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default RestaurantCards