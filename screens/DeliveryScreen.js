import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectRestaurant } from '../slices/restaurantSlice'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faX, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import * as Progress from 'react-native-progress'
import * as Animatable from 'react-native-animatable'

const DeliveryScreen = () => {
  const navigation = useNavigation()
  const restaurant = useSelector(selectRestaurant)
  return (
    <View className="bg-[#00CCBB] flex-1">
      <SafeAreaView className="z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <FontAwesomeIcon size={26} icon={faX} color="white" />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Order Help</Text>
        </View>

        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">45-55 Minutes</Text>
            </View>
            <Image
              source={{
                url: "https://links.papareact.com/fls"
              }}
              className="h-20 w-20"
            />
          </View>
          <Progress.Bar size={60} indeterminate={true} color="#00CCBB" />
          <Text className="mt-5 text-gray-500">
            Your order at <Text className="text-[#00CCBB]">{restaurant.title}</Text> is being prepared
          </Text>
        </View>
      </SafeAreaView>
      <Animatable.Image
        source={require("../assets/map.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="flex-1 w-full -mt-10 z-0"
      />

      <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28 z-10">
        <Image
          source={{
            url: "https://links.papareact.com/wru"
          }}
          className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg">
            Jordi Mantilla
          </Text>
          <Text className="text-gray-400">Your Rider</Text>
        </View>
        <Text className="text-[#00CCBB] text-lg mr-5 font-bold">Call</Text>
      </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen