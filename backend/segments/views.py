# Databricks notebook source
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Segment
from customers.models import Customer
from rest_framework import generics
from .models import Segment
from .serializers import SegmentSerializer

class SegmentListCreateView(
    generics.ListCreateAPIView
):
    queryset = Segment.objects.all()
    serializer_class = SegmentSerializer


class SegmentCustomersView(APIView):

    def get(self, request, pk):

        segment = Segment.objects.get(id=pk)

        customers = Customer.objects.filter(
            city__iexact=segment.city,
            total_spent__gte=segment.min_spend
        )

        data = []

        for customer in customers:
            data.append({
                "id": customer.id,
                "name": customer.name,
                "email": customer.email,
                "city": customer.city,
                "total_spent": customer.total_spent
            })

        return Response(data)