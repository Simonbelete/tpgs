from django.shortcuts import render
from rest_framework import viewsets, status


class HistoryViewSet(viewsets.ModelViewSet):
    class Meta:
        pass

    def list(self, request, *args, **kwargs):
        pk = self.kwargs['id']
        queryset = self.filter_queryset(self.get_queryset().filter(id=pk))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
