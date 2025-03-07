import axios from 'axios';
import { MessageInterface } from '@/types/types';
import { API_KEY, API_URL } from '@/config/runpodConfigs';

async function callChatBotAPI(messages: MessageInterface[]): Promise<MessageInterface> {
    try {
        const response = await axios.post(API_URL, {
            input: { messages }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        console.log("data: ", response.data)
        let output = response.data;
        let outputMessage: MessageInterface = output['output'];
        console.log("Output Message:", outputMessage)

        return outputMessage;
    } catch (error) {
        console.error('Error calling the API:', error);
        throw error;
    }
}

export { callChatBotAPI };