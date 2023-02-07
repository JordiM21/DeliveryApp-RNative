import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../slices/basketSlice'
import { selectRestaurant } from '../slices/restaurantSlice'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { urlFor } from '../sanity'

const BasketScreen = () => {
  const navigation = useNavigation()
  const restaurant = useSelector(selectRestaurant)
  const items = useSelector(selectBasketItems)
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([])
  const dispatch = useDispatch()
  const basketTotal = useSelector(selectBasketTotal)

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item)
      return results
    }, {})

    setGroupedItemsInBasket(groupedItems)
  }, [items])

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-md">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">{restaurant.title}</Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <FontAwesomeIcon color='#00CCBB' size={36} icon={faXmarkCircle} />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
            source={{
              url: "https://links.papareact.com/wru"
            }} />
          <Text className="flex-1">Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y-4 divide-gray-200 ">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View key={key} className="flex-row items-center space-x-3 bg-white py-3 px-5">
              <Text>{items.length} x</Text>
              <Image
                source={{ url: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">{items[0]?.price}.0$</Text>

              <TouchableOpacity
                onPress={() => dispatch(removeFromBasket({ id: key }))}
              >
                <Text className="text-[#00CCBB] text-xs">Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-500">Subtotal</Text>
            <Text className="text-gray-500">
              {basketTotal} $
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-500">Delivery Fee</Text>
            <Text className="text-gray-500">
              5.99 $
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="">Order Total</Text>
            <Text className="font-extrabold">
              {basketTotal + 5.99} $
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("PreparingOrderScreen")} className="rounded-lg bg-[#00CCBB] p-4">
            <Text className="text-white text-center text-lg font-bold">Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen