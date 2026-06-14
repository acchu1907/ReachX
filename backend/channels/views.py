# Databricks notebook source
from rest_framework.views import APIView
from rest_framework.response import Response
import random


class SendCampaignView(APIView):

    def post(self, request):

        sent = random.randint(80, 120)

        delivered = int(sent * 0.95)

        opened = int(delivered * 0.70)

        clicked = int(opened * 0.30)

        return Response({
            "sent": sent,
            "delivered": delivered,
            "opened": opened,
            "clicked": clicked,
            "status": "success"
        })