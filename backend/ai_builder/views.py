# Databricks notebook source
from rest_framework.decorators import api_view
from rest_framework.response import Response

import json

from .gemini_service import generate_ai_campaign


@api_view(["POST"])
def generate_campaign(request):

    prompt = request.data.get("prompt")

    result = generate_ai_campaign(prompt)

    return Response(result)