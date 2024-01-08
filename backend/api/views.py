from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, DestroyAPIView,RetrieveUpdateAPIView, UpdateAPIView
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer, UserDeleteSerializer, DeckSerializer, CardSerializer,DeckEditSerializer,CardCreateSerializer,UserUpdateSerializer, SettingsSerializer, AvailableCourseSerializer, UserLoginHistorySerializer, StatsSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password
from .models import Deck, AvailableCourse, Card, UserLoginHistory, Stats
from rest_framework.decorators import action
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect, csrf_exempt
from django.shortcuts import get_object_or_404
from django.utils import timezone

import logging

# Dodaj tę linię na początku pliku views.py
logger = logging.getLogger(__name__)

# @method_decorator(ensure_csrf_cookie, name='dispatch')
# class GetCSRFToken(APIView):
# 	permission_classes = (permissions.AllowAny,)

# 	def get(self, request, format=None):
# 		return Response({'success': 'CSRF cookie set'})
	
# @method_decorator(ensure_csrf_cookie, name='dispatch')
# class CheckAuthenticatedView(APIView):
#     def get(self, request, format=None):
#         user = self.request.user

#         try:
#             isAuthenticated = user.is_authenticated

#             if isAuthenticated:
#                 return Response({ 'isAuthenticated': 'success' })
#             else:
#                 return Response({ 'isAuthenticated': 'error' })
#         except:
#             return Response({ 'error': 'Something went wrong when checking authentication status' })



# @method_decorator(csrf_protect, name="dispatch")
class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		clean_data = custom_validation(request.data)
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)


# @method_decorator(csrf_protect, name="dispatch")
class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
	##
	def post(self, request):
		data = request.data
		assert validate_email(data)
		assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user)
			logger.info(f"User logged in: {request.user}")
			logger.info(f"Session ID cookie: {request.COOKIES.get('sessionid')}")
			return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		try:
			logout(request)
			return Response(status=status.HTTP_200_OK)
		except:
			return Response(status=status.HTTP_400_BAD_REQUEST)


# @method_decorator(ensure_csrf_cookie, name='dispatch')
class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
		serializer = UserSerializer(request.user)
		logger.info(f"User viewed profile: {request.user}")
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)
	
# @method_decorator(csrf_protect, name="dispatch")
class UserDeleteView(APIView):
    # permission_classes = (permissions.IsAuthenticated,)
    # authentication_classes = (SessionAuthentication,)

    def delete(self, request, format=None):
        logger.info(f"DELETE request received: {request}")
        user = self.request.user
        try:
            # Pobierz obiekt użytkownika
            user = get_user_model().objects.get(pk=user.pk)
            
            # Usuń użytkownika
            user.delete()

            # Wyloguj użytkownika po usunięciu
            logout(request)

            return Response({'detail': 'User deleted successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
		
class UserUpdateView(UpdateAPIView):
    serializer_class = UserUpdateSerializer
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get_object(self):
        return self.request.user

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        
        new_password = serializer.validated_data.get('password')
        if new_password:
            instance.set_password(new_password)
        
        new_username = serializer.validated_data.get('username')
        if new_username:
            instance.username = new_username
        
        instance.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

class CreateSettingsView(CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# @method_decorator(ensure_csrf_cookie, name='dispatch')

class UpdateSettingsView(RetrieveUpdateAPIView):
    serializer_class = SettingsSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user.settings

    @method_decorator(csrf_protect, name="dispatch")
    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
	
class SettingsView(RetrieveAPIView):
    serializer_class = SettingsSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        # Retrieve the user's settings
        return self.request.user.settings

    def get(self, request, *args, **kwargs):
        # Override the default get method to add any additional logic
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

class DeckDetailView(RetrieveAPIView):
    queryset = Deck.objects.all()
    serializer_class = DeckSerializer

class UserDecksView(ListAPIView):
    serializer_class = DeckSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Deck.objects.filter(user=user)

class IsOwnerOfDeck(permissions.BasePermission):
    message = 'You do not have permission to access this deck.'

    def has_permission(self, request, view):
        deck_id = view.kwargs.get('pk')
        deck = Deck.objects.get(pk=deck_id)
        return deck.user == request.user

class DeckCreateView(CreateAPIView):
	serializer_class = DeckSerializer
	# permission_classes = (permissions.IsAuthenticated,)

	def post(self, request, *args, **kwargs):
		user = request.data.get("user")
		name = request.data.get("name")

		user = get_user_model().objects.get(pk=user)

		queryset = Deck.objects.create(
			user=user,
			name=name,
		)
		serializer = self.get_serializer(queryset, many=False)
		return Response(serializer.data, status=status.HTTP_201_CREATED)


class DeckDeleteView(DestroyAPIView):
	queryset = Deck.objects.all()
	serializer_class = DeckSerializer
	permission_classes = (permissions.IsAuthenticated, IsOwnerOfDeck)

	def delete(self, request, *args, **kwargs):
		try:
			instance = self.get_object()
			self.perform_destroy(instance)
			return Response({'detail': 'Deck deleted successfully'}, status=status.HTTP_200_OK)
		except Exception as e:
			return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DeckUpdateView(RetrieveUpdateAPIView):
	queryset = Deck.objects.all()
	serializer_class = DeckEditSerializer
	permission_classes = (permissions.IsAuthenticated, IsOwnerOfDeck)
	
	def partial_update(self, request, *args, **kwargs):
		instance = self.get_object()
		instance.name = request.data.get("name")
		instance.save()
		serializer = self.serializer_class(instance, partial=True)
		return Response(serializer.data, status=status.HTTP_200_OK)
	
class CardCreateView(CreateAPIView):
    serializer_class = CardCreateSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOfDeck)

    def create(self, request, *args, **kwargs):
        deck = request.data.get('deck')
        # deck = Deck.objects.get(pk=deck)

        flashcards_data = request.data.get('flashcards', [])

        for flashcard_data in flashcards_data:
            flashcard_data['deck'] = deck  # Zmiana tego wiersza
            serializer = self.serializer_class(data=flashcard_data)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({'detail': 'Flashcards added successfully'}, status=status.HTTP_201_CREATED)

class AvailableCourseCreateView(CreateAPIView):
    serializer_class = AvailableCourseSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save()

class AvailableCourseListView(ListAPIView):
    queryset = AvailableCourse.objects.all()
    serializer_class = AvailableCourseSerializer

class DeckFlashcardsView(ListAPIView):
    serializer_class = CardSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOfDeck)

    def get_queryset(self):
        deck_id = self.kwargs['pk']
        return Card.objects.filter(deck_id=deck_id)
    
def add_login_history(request):
    user = request.user
    last_login_entry = UserLoginHistory.objects.filter(user=user).order_by('-login_date').first()

    if last_login_entry and last_login_entry.login_date == timezone.now().date():
        # Użytkownik już dzisiaj był zalogowany, nie dodawaj nowego wpisu
        return Response({'detail': 'Already logged in today'}, status=status.HTTP_400_BAD_REQUEST)

    UserLoginHistory.objects.create(user=user, login_date=timezone.now().date())
    return Response({'detail': 'Login history added successfully'}, status=status.HTTP_201_CREATED)
    
class UserLoginHistoryListView(ListAPIView):
    serializer_class = UserLoginHistorySerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return UserLoginHistory.objects.filter(user=user)

class UserLoginHistoryCreateView(CreateAPIView):
    serializer_class = UserLoginHistorySerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def post(self, request, *args, **kwargs):
        return add_login_history(request)

class ConsecutiveLoginDaysView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        user = self.request.user
        today = timezone.now().date()

        # Pobierz historię logowań i dodaj informacje o poprzednich i następnych wpisach
        login_history = UserLoginHistory.objects.filter(user=user).order_by('-login_date')

        # Określ, ile dni pod rząd użytkownik był zalogowany
        consecutive_days = self.calculate_consecutive_days(login_history, today)

        # Jeśli to pierwszy dzień, zwróć 1, w przeciwnym razie zwróć ilość dni pod rząd
        return Response({'consecutive_days': max(consecutive_days, 0)}, status=status.HTTP_200_OK)

    def calculate_consecutive_days(self, login_history, today):
        consecutive_days = 0

        if login_history.exists():  # Sprawdź, czy istnieje historia logowań
            for i in range(len(login_history) - 1):
                if (login_history[i].login_date - login_history[i + 1].login_date).days == 1:
                    consecutive_days += 1
                else:
                    break

            # Sprawdź, czy ostatni login to dzisiaj
            if login_history[0].login_date == today:
                consecutive_days += 1
        else:
            # Brak historii logowań, użytkownik jeszcze się nie zalogował
            consecutive_days = 0

        return consecutive_days

    
class UpdateStatsView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    def post(self, request, *args, **kwargs):
        xp = request.data.get('xp', 0)

        if xp < 0:
            return Response({'error': 'XP cannot be negative.'}, status=status.HTTP_400_BAD_REQUEST)

        user = self.request.user
        stats, created = Stats.objects.get_or_create(user=user)

        # Aktualizuj statystyki
        stats.update_stats(xp)

        # Serializuj obiekt Stats do JSON
        serializer = StatsSerializer(stats)
        serialized_data = serializer.data

        return Response({'detail': 'Stats updated successfully', 'stats': serialized_data}, status=status.HTTP_200_OK)

# class DeckViewSet(viewsets.ModelViewSet):

# 	# permission_classes = (permissions.IsAuthenticated,)
# 	authentication_classes = (SessionAuthentication,)
# 	queryset = Deck.objects.all()
# 	serializer_class = DeckSerializer

# 	@action(detail=False, methods=['post'])
# 	def create_deck_with_flashcards(self, request):
# 		try:
# 			# Pobierz dane dotyczące talii (decku) z żądania
# 			deck_data = request.data.get('deck', {})
# 			flashcards_data = request.data.get('flashcards', [])

# 			# Utwórz nową talię
# 			deck_serializer = DeckSerializer(data=deck_data)
# 			if deck_serializer.is_valid():
# 				deck = deck_serializer.save()

# 				# Dodaj fiszki do talii
# 				for flashcard_data in flashcards_data:
# 					flashcard_data['deck'] = deck.id
# 					card_serializer = CardSerializer(data=flashcard_data)
# 					if card_serializer.is_valid():
# 						card_serializer.save()
# 					else:
# 						return Response(card_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 				return Response({'detail': 'Deck and flashcards created successfully'}, status=status.HTTP_201_CREATED)
# 			else:
# 				return Response(deck_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 		except Exception as e:
# 			return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

