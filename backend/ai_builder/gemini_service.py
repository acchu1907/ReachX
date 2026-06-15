# Databricks notebook source
import google.generativeai as genai
from django.conf import settings
import json
import re


print("Gemini Key:", settings.GEMINI_API_KEY)

genai.configure(
    api_key=settings.GEMINI_API_KEY
)


model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


def generate_ai_campaign(prompt):

    instruction = f"""
You are an expert marketing campaign strategist.

User request:
{prompt}

Generate ONLY a JSON object.

Fields:
- name
- city
- min_spend
- channel
- message
- offer

channel must be one of:
email, sms, social, whatsapp

Return only JSON.
"""


    response = model.generate_content(instruction)

    text = response.text.strip()


    text = (
        text
        .replace("```json", "")
        .replace("```", "")
        .strip()
    )


    if not (text.startswith("{") and text.endswith("}")):

        match = re.search(
            r'\{.*\}',
            text,
            re.DOTALL
        )

        if match:
            text = match.group()


    print("Gemini Response:", text)


    result = json.loads(text)


    return result