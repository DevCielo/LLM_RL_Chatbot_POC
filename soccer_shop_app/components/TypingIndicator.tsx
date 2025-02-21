import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const TypingIndicator = () => {
    const [dots, setDots] = useState('')
    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prevDots => (prevDots.length < 3 ? prevDots + '.' : ''))
        }, 500)
        return () => clearInterval(interval)
    }, [])

    return (
        <Text>
            {`Typing${dots}`}
        </Text>
    )
}

export default TypingIndicator
