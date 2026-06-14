# Databricks notebook source
from django.urls import path
from .views import generate_campaign

urlpatterns = [
    path(
        '',
        generate_campaign
    ),

    
]