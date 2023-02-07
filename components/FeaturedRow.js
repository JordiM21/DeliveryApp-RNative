import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import RestaurantCards from './RestaurantCards'
import sanityClient from '../sanity'

const FeaturedRow = ({ id, title, description }) => {

  const [restaurants, setRestaurants] = useState([])


  useEffect(() => {
    sanityClient.fetch(`
    *[_type == "featured" && _id == $id ] {
      ...,
    restaurants[] -> {
      ...,
    dishes[] -> ,
      type -> {
        name
      }
    },
  }[0]
    `,
      { id }
    ).then(data => {
      setRestaurants(data?.restaurants)
    })
  }, [id])
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4" >
        <Text className="font-bold text-lg">{title}</Text>
        <FontAwesomeIcon icon={faArrowRight} />
      </View>
      <Text className="text-xs text-gray-500 px-4" >{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4 "
      >

        {/* restaurant cards..... */}
        {restaurants?.map(restaurant => (
          <RestaurantCards
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>

    </View>
  )
}

export default FeaturedRow