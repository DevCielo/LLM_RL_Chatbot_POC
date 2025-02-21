import { router } from 'expo-router';
import { Text, View, SafeAreaView, ImageBackground } from 'react-native';
import { TouchableOpacity, GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Index() {
    return (
        <View>
            <SafeAreaView
                className='w-full h-full'
            >
                <ImageBackground
                    className='w-full h-full items-center'
                    source={require('../assets/images/index_bg_image.png')}
                >
                    <Text className='text-3xl text-center pt-10 font-[Sora-Semibold]'>AI CHATBOT POC</Text>
                    <View className='flex h-[50%]' />
                    <Text className='pt-3 text-center font-[Sora-Regular]'>
                        One stop shop for all soccer stuff
                    </Text>

                    <GestureHandlerRootView>
                        <TouchableOpacity
                            className='bg-[#C67C4E] mt-10 p-3 rounded-lg items-center'
                            onPress={() => { router.push("/(tabs)/home") }}
                        >
                            <Text className='text-xl color-white font-[Sora-Semibold]'>
                                Get Started
                            </Text>
                        </TouchableOpacity>

                    </GestureHandlerRootView>


                </ImageBackground>
            </SafeAreaView>
        </View>
    )
}