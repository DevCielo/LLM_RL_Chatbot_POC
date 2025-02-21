import { Text, View } from 'react-native'
import React from 'react'
import DeliveryToggle from './DeliveryToggle'

const OrdersHeader = () => {
    return (
        <View>
            <DeliveryToggle />
            <Text
                className='mx-7 mt-7 text-[#242424] text-lg font-[Sora-Semibold]'
            >
                Delivery Address
            </Text>
            <Text
                className='mx-7 mt-3 text-[#242424] text-base font-[Sora-Semibold] mb-2'
            >
                Brisbane
            </Text>
            <Text
                className='mx-7 text-[#A2A2A2] text-xs font-[Sora-Regular] mb-3'
            >
                69 Jump Street, Brisbane Queensland
            </Text>

            <View
                className='mx-4 border-b border-gray-300 my-4'
            />
        </View>
    )
}

export default OrdersHeader
