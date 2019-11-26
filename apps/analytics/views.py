from django.utils import timezone
from django.utils.dateparse import parse_datetime

from rest_framework import status
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# from .models import PlaysStats
# from .serializers import PlaysStatsSerializer

# class PlaysStatsListView(ListAPIView):
#     queryset = PlaysStats.objects.all()
#     serializer_class = PlaysStatsSerializer
#     permission_classes = (IsAuthenticated,)

#     def list(self, request, *args, **kwargs):
#         if not self.request.query_params.get('dt__gte') and not self.request.query_params.get('dt__lt'):
#             return Response("Date-time filters for 'dt' (dt__gte and/or dt__lt) field are required",
#                             status=status.HTTP_400_BAD_REQUEST)

#         return super().list(request, *args, **kwargs)

#     def get_queryset(self):
#         date_from = self.request.query_params.get('dt__gte')
#         date_to = self.request.query_params.get('dt__lt')

#         if not date_from and not date_to:
#             return super().get_queryset().none()

#         if date_from:
#             date_from = parse_datetime(date_from)
#         # todo default date_from value?

#         if date_to:
#             date_to = parse_datetime(date_to)
#         else:
#             date_to = timezone.now()

#         return super().get_queryset().filter(customer=self.request.user.customer)\
#             .between_dates(date_from, date_to)
