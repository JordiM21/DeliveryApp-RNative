import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from "react-native-animatable"
import * as Progress from "react-native-progress"
import { useNavigation } from '@react-navigation/native'

const PreparingOrderScreen = () => {
  const navigation = useNavigation()

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery")
    }, 4000)
  }, [])

  return (
    <SafeAreaView className="bg-white flex-1 justify-center items-center" >
      <Animatable.Image
        source={require("../assets/moto.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-full"
      />

      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-ls my-10 text-[#00CCBB] font-bold text-center"
      >
        Waiting for Restaurant to accept your order!
      </Animatable.Text>
      <Progress.Bar size={60} indeterminate={true} color="#00CCBB" />
    </SafeAreaView>
  )
}

export default PreparingOrderScreen