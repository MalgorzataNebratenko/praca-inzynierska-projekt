from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class AppUserManager(BaseUserManager):
	def create_user(self, email, password=None, **extra_fields):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		email = self.normalize_email(email)
		user = self.model(email=email, **extra_fields)
		user.set_password(password)
		user.save()
		return user
	def create_superuser(self, email, password=None, **extra_fields):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		user = self.create_user(email, password, **extra_fields)
		user.is_superuser = True
		user.save()
		return user


class AppUser(AbstractBaseUser, PermissionsMixin):
	user_id = models.AutoField(primary_key=True)
	email = models.EmailField(max_length=50, unique=True)
	username = models.CharField(max_length=50)
	nationality = models.CharField(max_length=50, blank=True, null=True)
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['username']
	objects = AppUserManager()
	def __str__(self):
		return self.username
	

class Deck(models.Model):
	deck_id = models.AutoField(primary_key=True)
	user = models.ForeignKey(AppUser, on_delete=models.CASCADE, null=False)
	name = models.CharField(max_length= 200)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.name
	

class Card(models.Model):
	card_id = models.AutoField(primary_key=True)
	deck = models.ForeignKey(Deck, on_delete=models.CASCADE, null=False)
	front = models.TextField(null=False)
	back = models.TextField(null=False)
	viewed = models.IntegerField(null=True, blank=True, default=0)
	correct_answers = models.IntegerField(null=True, blank=True, default=0)
	wrong_answers = models.IntegerField(null=True, blank=True, default=0)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.front
	
	# class Meta:
	# 	ordering = ["created_at"]

	