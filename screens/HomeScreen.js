import { Image, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronDown, faQuestion, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity'

const HomeScreen = () => {
  const navigation = useNavigation()

  const [featuredCategories, setFeaturedCategories] = useState([])

  //useLayout allows to do something when the page is showed
  //basically means when complete UI loads this compile
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
      //headerShown: "Something will give a header to the actual page"
    })
  }, [])

  //useEffect works when component functional loads
  useEffect(() => {
    sanityClient.fetch(`
    *[_type == "featured"] {
      ...,
    restaurants[] => {
      ...,
    dishes[] => {
      ..., 
      }
    }
  }`).then(data => {
      setFeaturedCategories(data)
    })
  }, [])

  return (
    // Safe area view keep the content inside and avoid issues with notch or edges on smartphones
    <SafeAreaView className="bg-white pt-5">
      <View>
        {/* Header */}
        <View className="flex-row pb-3 items-center mx-4 space-x-2 px-4">
          <Image source={{
            url: "https://links.papareact.com/wru"
          }}
            className="h-7 w-7 bg-gray-300 p-4 rounded-full"
          />

          <View className="flex-1">
            <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
            <Text className="font-bold text-xl">
              Current location
              <FontAwesomeIcon color='#00ccb0' icon={faChevronDown} />
            </Text>
          </View>
          <FontAwesomeIcon color='#00ccb0' size={28} icon={faUser} />
        </View>

        {/* Search */}
        <View className="flex-row items-center space-x-2 pb-2 mx-4 px-4">
          <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3" >
            <FontAwesomeIcon size={20} color='gray' icon={faSearch} />
            <TextInput className="w-11/12" keyboardType='default' placeholder='Restaurants and Business' />
          </View>
          <FontAwesomeIcon size={28} color='#00ccb0' icon={faQuestion} />
        </View>
      </View>

      {/* Content scrollable */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 100
        }}
      >
        {/* Category Horizontal Scrollable */}
        <Categories />

        {featuredCategories?.map(category => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
            featuredCategory="featured"
          />
        ))}

      </ScrollView>

    </SafeAreaView>
  );
}
export default HomeScreen