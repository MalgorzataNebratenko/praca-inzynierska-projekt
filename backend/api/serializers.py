from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError
from .models import Deck, Card, Settings, AvailableCourse

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'
    def create(self, clean_data):
        user_obj = UserModel.objects.create_user(email=clean_data['email'],
                                                 password=clean_data['password'],
                                                 nationality=clean_data['nationality'])
        user_obj.username = clean_data['username']
        user_obj.save()
        return user_obj

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    ##
    def check_user(self, clean_data):
        user = authenticate(username = clean_data['email'], password=clean_data['password'])
        if not user:
            raise ValidationError('user not found')
        return user

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ('user_id','email', 'username', 'nationality')
          
class UserDeleteSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = '__all__'
          
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['username', 'password']  

class SettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Settings
        fields = ['display_nationality', 'daily_goal', 'public_account']
          
class DeckSerializer(serializers.ModelSerializer):
    # cards = serializers.PrimaryKeyRelatedField(
    #     many=True, read_only=True
    # )

    class Meta:
        model = Deck
        fields = ("deck_id", "user", "name", "created_at")

class DeckEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deck
        fields = ['name' ]

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = (
            "card_id",
            "deck",
            "front",
            "back",
            "viewed",
            "correct_answers",
            "wrong_answers",
            "created_at",
        )

    # def to_representation(self, instance):
    #     rep = super(CardSerializer, self).to_representation(instance)
    #     rep["deck"] = instance.deck.name
    #     rep["deck_id"] = instance.deck.id
    #     return rep

class CardCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['deck','front', 'back']

class AvailableCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvailableCourse
        fields = '__all__'