import { Text, View } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface DetailsInterface {
    description: string
}

const DescriptionSection = ({ description }: DetailsInterface) => {
    const [expanded, setExpanded] = useState(false)

    return (
        <View>
            <Text
                className='text-[#242424] text-lg font-[Sora-Semibold] ml-1 mt-3'
            >
                Description
            </Text>

            <View
                className='p-2'
            >
                <Text
                    className='text-[#A2A2A2] text-xs font-[Sora-Regular]'
                    numberOfLines={expanded ? undefined : 3}
                >
                    {expanded ? description : `${description.slice(0, 100)} ...`}
                </Text>

                <TouchableOpacity
                    onPress={() => setExpanded(!expanded)}
                >
                    <Text
                        className='terxt-app_orange_color text-xs font-[Sora-Regular]'
                    > {expanded ? 'Read less' : 'Read More'} </Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default DescriptionSection
