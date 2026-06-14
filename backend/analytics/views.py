# Databricks notebook source
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Sum
from customers.models import Customer
from campaigns.models import Campaign
from orders.models import Order


@api_view(['GET'])
def analytics_summary(request):

    total_customers = Customer.objects.count()

    total_campaigns = Campaign.objects.count()

    total_orders = Order.objects.count()

    running_campaigns = Campaign.objects.filter(
        status="Running"
    ).count()

    delivered_campaigns = Campaign.objects.filter(
        status="Delivered"
    ).count()

    draft_campaigns = Campaign.objects.filter(
        status="Draft"
    ).count()


    total_revenue = Customer.objects.aggregate(
        Sum('total_spent')
    )['total_spent__sum'] or 0

    return Response({
        "total_customers": total_customers,
        "total_campaigns": total_campaigns,
        "running_campaigns": running_campaigns,
        "delivered_campaigns": delivered_campaigns,
        "draft_campaigns": draft_campaigns,
        "total_revenue": total_revenue
    })