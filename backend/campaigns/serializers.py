# Databricks notebook source
from rest_framework import serializers
from .models import Campaign


class CampaignSerializer(serializers.ModelSerializer):

    class Meta:
        model = Campaign
        fields = [
            "id",
            "name",
            "audience",
            "status",
            "created_at",
            "segment_city",
            "segment_min_spend",
            "audience_count",
        ]

        read_only_fields = [
            "id",
            "created_at"
        ]