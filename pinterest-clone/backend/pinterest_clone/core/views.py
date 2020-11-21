from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from .models import Pin, Board
from .serializers import PinSerializer, BoardSerializer

class PinViewSet(ModelViewSet):
    queryset = Pin.objects.all()
    serializer_class = PinSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=False, methods=['get'])
    def following(self, request, pk=None):
        following_users = request.user.following.all()
        queryset = self.get_queryset().filter(author__in=following_users)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class BoardViewSet(ModelViewSet):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=True, methods=['post'])
    def add_pin(self, request, pk=None):
        board = self.get_object()
        board.pins.add(request.data["id"])
        serializer = self.get_serializer(board)
        return Response(serializer.data)

class CheckAuth(APIView):
    permission_classes = (AllowAny,)
    def get(self, request, *args, **kwargs):
        print(request.headers)
        print(request.META)
        if request.user.is_authenticated:
            return Response("true", 200)
        else:
            return Response("false", 401)
