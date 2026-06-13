# Databricks notebook source
from django.urls import path
from .views import campaign_list, delete_campaign
from .views import (
    
    campaign_list,
    delete_campaign,
    update_campaign,
    audience_preview
)

urlpatterns = [
    path('', campaign_list),
    path('<int:pk>/', delete_campaign),
    path('update/<int:pk>/', update_campaign),
    path("audience-preview/",audience_preview),

    
]