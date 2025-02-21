import { Alert, TouchableOpacity, View, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import MessageList from '@/components/MessageList'
import { MessageInterface } from '@/types/types';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { callChatBotAPI } from '@/services/chatBot'
import PageHeader from '@/components/PageHeader'
import { useCart } from '@/components/CartContext'

const ChatRoom = () => {
    const { addToCart, emptyCart } = useCart();

    const [messages, setMessages] = useState<MessageInterface[]>([]);
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const textRef = useRef('')
    const inputRef = useRef<TextInput>(null)

    useEffect(() => {
    }, [messages]);

    const handleSendMessage = async () => {
        let message = textRef.current.trim();
        if (!message) return;

        // Create the user message
        const userMessage = { content: message, role: 'user' };

        // Log current messages for debugging
        console.log("Messages before sending:", [...messages, userMessage]);

        let InputMessages = [...messages, userMessage];

        // Optionally filter out any invalid messages
        InputMessages = InputMessages.filter(msg => msg && msg.content);

        setMessages(InputMessages);
        textRef.current = '';
        inputRef.current?.clear();
        setIsTyping(true);

        try {
            const responseMessage = await callChatBotAPI(InputMessages);
            console.log("Response Message:", responseMessage);
            setIsTyping(false);
            setMessages(prevMessages => [...prevMessages, responseMessage]);
        } catch (err) {
            setIsTyping(false);
        }
    };



    return (
        <GestureHandlerRootView>
            <StatusBar style='dark' />

            <View
                className='flex-1 bg-white'
            >

                <PageHeader title="Chat Bot" showHeaderRight={false} bgColor='white' />

                <View className='h-3 border-b border-neutral-300' />

                <View
                    className='flex-1 justify-between bg-neutral-100 overflow-visibile'
                >
                    <View
                        className='flex-1'
                    >
                        <MessageList
                            messages={messages}
                            isTyping={isTyping}

                        />
                    </View>

                    <View
                        style={{ marginBottom: hp(2.7) }}
                        className='pt-2'
                    >
                        <View
                            className="flex-row mx-3 justify-between border p-2 bg-white border-neutral-300  rounded-full pl-5"
                        >
                            <TextInput
                                ref={inputRef}
                                onChangeText={value => textRef.current = value}
                                placeholder='Type message...'
                                style={{ fontSize: hp(2) }}
                                className='flex-1 mr2'
                            />
                            <TouchableOpacity
                                onPress={handleSendMessage}
                                className='bg-neutral-200 p-2 mr-[1px] rounded-full'
                            >
                                <Feather name="send" size={hp(2.7)} color="#737373" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>



            </View>
        </GestureHandlerRootView>
    )
}

export default ChatRoom