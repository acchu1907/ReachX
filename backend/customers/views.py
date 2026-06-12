# Databricks notebook source
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Customer
from .serializers import CustomerSerializer


@api_view(['GET', 'POST'])
def customer_list(request):


    if request.method == 'GET':
        customers = Customer.objects.all()
        serializer = CustomerSerializer(customers, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CustomerSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)
    

from django.shortcuts import get_object_or_404

@api_view(['DELETE'])
def delete_customer(request, pk):

    customer = get_object_or_404(
        Customer,
        pk=pk
    )

    customer.delete()

    return Response(
        {"message": "Customer deleted"}
    )

@api_view(['PUT'])
def update_customer(request, pk):

    customer = get_object_or_404(
        Customer,
        pk=pk
    )

    serializer = CustomerSerializer(
        customer,
        data=request.data
    )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors)

