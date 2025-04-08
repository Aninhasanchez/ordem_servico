from django.urls import path
from .views import *

urlpatterns = [

    path('patrimonios', PatrimoniosView.as_view()),
    path('ambientes', AmbientesView.as_view()),
    path('manutentores', ManutentoresView.as_view()),
    path('gestor', GestorView.as_view()),
    path('ordemServico', OrdemServicoView.as_view()),

]
