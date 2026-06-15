# Databricks notebook source
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .gemini_service import generate_ai_campaign


@api_view(["POST"])
def generate_campaign(request):

    prompt = request.data.get("prompt")

    if not prompt:
        return Response({
            "error": "Prompt is required"
        }, status=400)


    try:

        result = generate_ai_campaign(prompt)

        return Response(result)


    except Exception as e:

        print("AI Builder Error:", e)

        # fallback response
        return Response({

            "name": "Premium Customer Campaign",

            "city": "Chennai",

            "min_spend": 10000,

            "channel": "email",

            "message": "Exclusive offers for premium customers.",

            "offer": "20% off"

        })