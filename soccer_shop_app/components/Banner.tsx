import { Image, Text, View } from 'react-native'
import React from 'react'

const Banner = () => {
    return (
        <View
            className='rounded-lg items-center'
        >
            <View
                className='absolute w-full h-[90px] -top-1 items-center bg-[#222222] pb-10'
            />
            <Image
                source={require('../assets/images/banner.png')}
                className="w-[90%] h-36 rounded-3xl"
            />

            <View
                className='absolute w-[90%] pl-7 mt-2'
            >
                {/* Promo badge */}
                <Text
                    className='bg-[#ED5151] rounded-lg text-white mt-1 text-m p-1.5 font-[Sora-Semibold] self-start'
                >
                    Promo
                </Text>

            </View>

        </View>
    )
}

export default Banner
