from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
# router.register(r'deck_create', views.DeckViewSet, basename='deck_create')


urlpatterns = [
	path('register', views.UserRegister.as_view(), name='register'),
	path('login', views.UserLogin.as_view(), name='login'),
	path('logout', views.UserLogout.as_view(), name='logout'),
	path('user', views.UserView.as_view(), name='user'),
    path('delete', views.UserDeleteView.as_view(), name='delete'),
    # path('csrf_cookie', views.GetCSRFToken.as_view(), name='csrf_cookie'),
    path("deck_create", views.DeckCreateView.as_view(), name="deck_create"),
    path("deck/<str:pk>/", views.DeckDetailView.as_view(), name="deck_detail"),
    path("deck/<str:pk>/delete/", views.DeckDeleteView.as_view(), name="deck_delete"),
    path("deck/<str:pk>/update/", views.DeckUpdateView.as_view(), name="deck_update"),
    path('deck/<str:pk>/add_flashcards/', views.CardCreateView.as_view(), name='add_flashcards'),
    # path('flashcards/create/', views.DeckViewSet.as_view({'post': 'create_deck_with_flashcards'}), name='create_deck_with_flashcards'),
]