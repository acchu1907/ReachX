# Databricks notebook source
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    path(
        'api/customers/',
        include('customers.urls')
    ),

    path(
        'api/campaigns/',
        include('campaigns.urls')
    ),

    path(
    'api/analytics/',
    include('analytics.urls')
 ),

 path(
    'api/ai-builder/',
    include('ai_builder.urls')
),

path(
    'api/orders/',
    include('orders.urls')
),

]