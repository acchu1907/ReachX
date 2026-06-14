# Databricks notebook source
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Campaign
from .serializers import CampaignSerializer

from customers.models import Customer


@api_view(['GET'])
def audience_preview(request):

    city = request.GET.get("city")
    min_spend = request.GET.get("min_spend")
    status = request.GET.get("status")


    customers = Customer.objects.all()


    if city:
        customers = customers.filter(
            city__iexact=city
        )


    if min_spend:
        customers = customers.filter(
            total_spent__gte=min_spend
        )


    if status:
        customers = customers.filter(
            status__iexact=status
        )


    customer_data = []

    for customer in customers:

        customer_data.append({

            "id": customer.id,
            "name": customer.name,
            "email": customer.email,
            "city": customer.city,
            "total_spent": customer.total_spent,
            "status": customer.status

        })


    return Response({

        "audience_count": customers.count(),

        "customers": customer_data

    })


@api_view(['GET', 'POST'])
def campaign_list(request):

    if request.method == 'GET':
        campaigns = Campaign.objects.all()

        serializer = CampaignSerializer(
            campaigns,
            many=True
        )

        return Response(serializer.data)

    elif request.method == 'POST':

        serializer = CampaignSerializer(
            data=request.data
        )

    if serializer.is_valid():
        campaign = serializer.save()

    customers = Customer.objects.all()


    if campaign.segment_city:

        customers = customers.filter(
            city__iexact=campaign.segment_city
        )


    if campaign.segment_min_spend:

        customers = customers.filter(
            total_spent__gte=campaign.segment_min_spend
        )


    campaign.audience_count = customers.count()

    campaign.save()


    return Response(
        CampaignSerializer(campaign).data
    )




    return Response(serializer.errors)


@api_view(['DELETE'])
def delete_campaign(request, pk):

    campaign = get_object_or_404(
        Campaign,
        pk=pk
    )

    campaign.delete()

    return Response({
        "message": "Campaign deleted"
    })


@api_view(['PUT'])
def update_campaign(request, pk):

    campaign = get_object_or_404(
        Campaign,
        pk=pk
    )

    serializer = CampaignSerializer(
        campaign,
        data=request.data
    )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors)