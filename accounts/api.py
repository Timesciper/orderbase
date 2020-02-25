from .serializers import LoginSerializer, UserSerializer
from rest_framework import generics, permissions, viewsets
from knox.models import AuthToken
from rest_framework.response import Response
from .models import CustomUser


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            'user': UserSerializer(user, context=self.get_serializer_context()).data,
            'token': AuthToken.objects.create(user)[1]
        })


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = UserSerializer


class SystemViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all().filter(user_type='system')
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer