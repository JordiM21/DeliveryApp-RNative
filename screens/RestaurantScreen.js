import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { urlFor } from '../sanity'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft, faChevronRight, faLocationPin, faQuestionCircle, faStar } from '@fortawesome/free-solid-svg-icons'
import DishRow from '../components/DishRow'
import BasketIcon from '../components/BasketIcon'
import { useDispatch } from 'react-redux'
import { setRestaurant } from '../slices/restaurantSlice'

const RestaurantScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const { params: {
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
  } } = useRoute()

  useEffect(() => {
    dispatch(setRestaurant({
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
    }))
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  })

  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View className="relative">
          <Image
            source={{
              url: urlFor(imgUrl).url()
            }}
            className="w-full h-56 bg-gray-300 p-4"
          />
          <TouchableOpacity onPress={navigation.goBack} className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full">
            <FontAwesomeIcon color='#00CCBB' size={28} icon={faArrowLeft} />
          </TouchableOpacity>
        </View>
        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <FontAwesomeIcon size={22} color='green' icon={faStar} />
                <Text className="text-xs text-gray-500">{rating} - {genre}</Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <FontAwesomeIcon size={18} color='gray' icon={faLocationPin} />
                <Text className="text-xs text-gray-500">Nearby - {address}</Text>
              </View>
            </View>
            <Text className="text-gra-500 mt-2 pb-4">{short_description}</Text>
          </View>
          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <FontAwesomeIcon size={22} color='gray' icon={faQuestionCircle} />
            <Text className="pl-2 flex-1 text-md font-bold">Have a food allergy?</Text>
            <FontAwesomeIcon size={22} color='#00CCBB' icon={faChevronRight} />
          </TouchableOpacity>
        </View>
        <View className="pb-36">
          <Text className="px-4 pt-6 mb-3 font-bold text-lg">Menu</Text>

          {/* Dishrows */}

          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}

        </View>
      </ScrollView>
    </>
  )
}

export default RestaurantScreen