# Databricks notebook source
from django.db import models

class Campaign(models.Model):

    STATUS_CHOICES = [
        ('Draft', 'Draft'),
        ('Running', 'Running'),
        ('Delivered', 'Delivered'),
    ]

    name = models.CharField(max_length=255)

    audience = models.IntegerField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='Draft'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    segment_city = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    segment_min_spend = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        blank=True,
        null=True
    )

    audience_count = models.IntegerField(
        default=0
    )

    def __str__(self):
        return self.name
    