# Databricks notebook source
import google.generativeai as genai
from django.conf import settings
import json


genai.configure(
    api_key=settings.GEMINI_API_KEY
)


model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

def generate_ai_campaign(prompt):

    instruction = f"""
You are a CRM marketing AI.

Create a campaign based on:

{prompt}

Return ONLY JSON:

{{
"name":"",
"city":"",
"min_spend":0,
"channel":"",
"message":"",
"offer":""
}}
"""

    response = model.generate_content(instruction)

    text = response.text.strip()

    # Remove markdown fences if Gemini adds them
    text = text.replace("```json", "")
    text = text.replace("```", "")
    text = text.strip()

    return json.loads(text)