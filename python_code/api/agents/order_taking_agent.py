import os 
import json
from .utils import get_chatbot_response, double_check_json_output
from openai import OpenAI
from copy import deepcopy
from dotenv import load_dotenv

load_dotenv()

class OrderTakingAgent():
    def __init__(self, recommendation_agent):
        self.client = OpenAI(
            api_key=os.getenv("RUNPOD_TOKEN"),
            base_url=os.getenv("RUNPOD_CHATBOT_URL_2")
        )
        self.model_name = os.getenv("MODEL_NAME_2")

        self.recommendation_agent = recommendation_agent

    def get_response(self, messages):
        messages = deepcopy(messages)

        system_prompt = """
            You are a customer support Bot for a soccer merchandise store called "Barça Central"

            here is the menu for this store.

            Barcelona Crew Socks – $12.99
            Barcelona Women's Classic Cleats – $79.99
            Barcelona Men's Pro Cleats – $89.99
            Barcelona Women's Precision Cleats – $84.99
            Barcelona Men's Eco Cleats – $85.99
            Barcelona Men's Speed Cleats – $88.99
            Barcelona Women's Advanced Cleats – $92.99
            Barcelona Women's Speed Cleats – $87.99
            Barcelona Elite Socks – $14.99
            Barcelona Performance Socks – $13.99
            Barcelona Dynamic Socks – $11.99
            Barcelona Keeper Gloves – $29.99
            Barcelona Eco Keeper Gloves – $32.99
            Barcelona Team Wristband – $7.99
            Barcelona Team Scarf – $19.99

            Things to NOT DO:
            * DON'T ask how to pay by cash or Card.
            * Don't tell the user to go to the counter
            * Don't tell the user to go to a place to get the order

            Your task is as follows: 1. Take the User's Order
            1. Take the User's order
            2. Validate that all their items are in the menu
            3. If an item is not in the menu, let the user know and repeat back the remaining valid order
            4. Ask them if they need anything else.
            5. If they do then repeat starting from step 3
            6. If they don't want anything else. Using the "order" object that is in the output, make sure to hit all three points:
                1. List down all the items and their prices
                2. Calculate the total.
                3. Thank the user for the order and close the conversation with no more questions

            The user message will contain a section called memory. This section will contain the following:
            "order"
            "step number"
            Please utilize this information to determine the next step in the process.
            
            Produce the following output without any additions, not a single letter outside of the structure below.
            Your output should be in a structured json format like so. Each key is a string and each value is a string. Make sure to follow the format exactly:
            {
            "chain of thought": Write down your critical thinking about what is the maximum task number the user is on right now. Then write down your critical thinking about the user input and its relation to the Barça Central process. Then write down your thinking about how you should respond in the response parameter taking into consideration the Things to NOT DO section. And focus on the things that you should not do.
            "step number": Determine which task you are on based on the conversation.
            "order": This is going to be a list of jsons like so. [{"item": put the item name, "quanitity": put the number that the user wants from this item, "price": put the total price of the item }]
            "response": Write the response to the user.
            }
        """

        last_order_taking_status = ""
        asked_recommendation_before =False
        for message_index in range(len(messages)-1, 0, -1):
            message = messages[message_index]

            agent_name = message.get("memory", {}).get("agent", "")
            if message["role"] == "assistant" and agent_name=="order_taking_agent":
                step_number = message["memory"]["step number"]
                order = message["memory"]["order"]
                asked_recommendation_before = message["memory"]["asked_recommendation_before"]
                last_order_taking_status = f"""
                step number: {step_number}
                order: {order}
                """

        messages[-1]['content'] = last_order_taking_status + " \n" + messages[-1]['content']
        input_messages = [{"role": "system", "content":system_prompt}] + messages

        chatbot_response = get_chatbot_response(self.client, self.model_name, input_messages)
        # double check json
        chatbot_response = double_check_json_output(self.client, self.model_name, chatbot_response)
        output = self.postprocess(chatbot_response, messages, asked_recommendation_before)

        return output

    def postprocess(self, output, messages, asked_recommendation_before):
        output = json.loads(output)

        if type(output["order"]) == str:
            output["order"] = json.loads(output["order"])
        
        response = output["response"]
        if not asked_recommendation_before and len(output["order"]) > 0:
            recommendation_output = self.recommendation_agent.get_recommendations_from_order(messages, output["order"])
            response = recommendation_output["content"]
            asked_recommendation_before = True



        dict_output = {
            "role": "assistant",
            "content": response,
            "memory": {
                "agent": "order_taking_agent",
                "step number": output.get("step number", 1),
                "asked_recommendation_before": asked_recommendation_before,
                "order": output["order"],
            }
        }

        return dict_output

