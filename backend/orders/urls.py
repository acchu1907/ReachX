# Databricks notebook source
from django.urls import path

from .views import (
    order_list,
    delete_order,
    update_order,
)

urlpatterns = [

    path(
        '',
        order_list
    ),

    path(
        '<int:pk>/',
        delete_order
    ),

    path(
        'update/<int:pk>/',
        update_order
    ),

]