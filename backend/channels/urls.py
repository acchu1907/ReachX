# Databricks notebook source
from django.urls import path
from .views import SendCampaignView

urlpatterns = [
    path(
        "send/",
        SendCampaignView.as_view()
    ),
]