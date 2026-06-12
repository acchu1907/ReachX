# Databricks notebook source
from django.urls import path
from .views import (
    customer_list,
    delete_customer,
    update_customer
)

urlpatterns = [
    path('', customer_list),

    path(
        '<int:pk>/',
        delete_customer
    ),

    path(
        'update/<int:pk>/',
        update_customer
    ),
]