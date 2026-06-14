# Databricks notebook source
from django.urls import path
from .views import (
    SegmentListCreateView,
    SegmentCustomersView
)

urlpatterns = [
    path("", SegmentListCreateView.as_view()),

    path(
        "<int:pk>/customers/",
        SegmentCustomersView.as_view()
    ),
]