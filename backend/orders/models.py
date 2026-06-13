# Databricks notebook source
from django.db import models

class Order(models.Model):

    customer_name = models.CharField(
        max_length=100
    )

    product_name = models.CharField(
        max_length=100
    )

    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    status = models.CharField(
        max_length=50,
        default="Pending"
    )

    def __str__(self):
        return self.product_name