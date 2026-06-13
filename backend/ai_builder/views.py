# Databricks notebook source
from rest_framework.decorators import api_view
from rest_framework.response import Response

from customers.models import Customer


@api_view(['POST'])
def generate_campaign(request):

    prompt = request.data.get(
        "prompt",
        ""
    )

    audience_size = Customer.objects.count()

    return Response({
        "audience": audience_size,
        "channel": "WhatsApp",
        "reach": "82%",
        "conversion": "14%",
        "message":
            f"Campaign generated for: {prompt}"
    })