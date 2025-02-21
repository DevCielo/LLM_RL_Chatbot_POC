import { Text, View } from 'react-native'
import React from 'react'
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler'
import { router } from 'expo-router'

const thankyou = () => {
    return (
        <GestureHandlerRootView>
            <View
                className='w-full h-full items-center justify-center'
            >
                <Text
                    className='text-3xl font-[Sora-Semibold] text-center mx-10 mb-5'
                >Thank you for your order</Text>

                <TouchableOpacity
                    className='bg-app_orange_color w-[80%] rounded-2xl items-center justify-center mt-3 px-4 py-3'
                    onPress={() => { router.push("/(tabs)/home") }}
                >
                    <Text
                        className='text-xl color-white font-[Sora-Regular]'
                    >
                        Return to Home Page
                    </Text>
                </TouchableOpacity>
            </View>
        </GestureHandlerRootView>
    )
}

export default thankyou
