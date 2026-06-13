# Databricks notebook source
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Order
from .serializers import OrderSerializer


@api_view(['GET', 'POST'])
def order_list(request):

    if request.method == 'GET':

        orders = Order.objects.all()

        serializer = OrderSerializer(
            orders,
            many=True
        )

        return Response(serializer.data)

    elif request.method == 'POST':

        serializer = OrderSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                serializer.data,
                status=201
            )

        return Response(
            serializer.errors,
            status=400
        )


@api_view(['DELETE'])
def delete_order(request, pk):

    order = get_object_or_404(
        Order,
        pk=pk
    )

    order.delete()

    return Response({
        "message": "Deleted"
    })


@api_view(['PUT'])
def update_order(request, pk):

    order = get_object_or_404(
        Order,
        pk=pk
    )

    serializer = OrderSerializer(
        order,
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response(
            serializer.data
        )

    return Response(
        serializer.errors,
        status=400
    )