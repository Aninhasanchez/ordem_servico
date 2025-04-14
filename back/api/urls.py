from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView, TokenObtainPairView


from django.urls import path
from .views import *


urlpatterns = [

    path('patrimonios', PatrimoniosView.as_view()),
    path('ambientes', AmbientesView.as_view()),
    path('manutentores', ManutentoresView.as_view()),
    path('gestor', GestorView.as_view()),
    path('ordemServico', OrdemServicoView.as_view()),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain'),

]
