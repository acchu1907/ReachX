# Databricks notebook source
from django.db import models


class Segment(models.Model):

    name = models.CharField(
        max_length=255
    )

    city = models.CharField(
        max_length=100
    )

    min_spend = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name