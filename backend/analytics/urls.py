# Databricks notebook source
from django.urls import path
from .views import analytics_summary

urlpatterns = [
    path('', analytics_summary),
]