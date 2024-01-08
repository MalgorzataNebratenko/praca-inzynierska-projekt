from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone

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
	
class Settings(models.Model):
    user = models.OneToOneField(
        'AppUser', related_name='settings', on_delete=models.CASCADE
    )
    display_nationality = models.BooleanField(default=True)
    daily_goal = models.IntegerField(default=40)
    public_account = models.BooleanField(default=False)

    def __str__(self):
        return f"Settings for {self.user.username}"
	

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

class AvailableCourse(models.Model):
	course_id = models.AutoField(primary_key=True)
	display_name = models.CharField(max_length= 100)
	course_type = models.CharField(max_length= 100)
	code = models.CharField(max_length=5)

	def __str__(self):
		return self.display_name
	
class Stats(models.Model):
	user = models.OneToOneField(
        'AppUser', related_name='stats', on_delete=models.CASCADE
    )
	daily_xp = models.IntegerField(null=True, blank=True, default=0)
	weekly_xp = models.IntegerField(null=True, blank=True, default=0)
	monthly_xp = models.IntegerField(null=True, blank=True, default=0)
	total_xp = models.IntegerField(null=True, blank=True, default=0)
	last_reviewed_language_code = models.CharField(max_length=5, default="gb")

	def update_stats(self, xp):
		self.daily_xp += xp
		self.weekly_xp += xp
		self.monthly_xp += xp
		self.total_xp += xp

		self.save()

	def __str__(self):
		return f"Stats for {self.user.username}"
	
class UserLoginHistory(models.Model):
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE, null=False)
    login_date = models.DateField(default=timezone.now)

    def __str__(self):
        return f"{self.user.username} - {self.login_date}"
	
# class BaseUnits(models.Model):
# 	units_id = models.AutoField(primary_key=True)
# 	name = models.CharField(max_length=100)
# 	description = models.TextField()
# 	course = models.ForeignKey(AvailableCourse, on_delete=models.CASCADE, null=False)
# 	completed = models.BooleanField(default=False)
# 	unlocked = models.BooleanField(default=False)

# 	class Meta:
# 		abstract = True  # Oznacza, że to jest model abstrakcyjny i nie będzie miał swojej własnej tabeli w bazie danych

# class PolishEnglishUnits(BaseUnits):
#     class Meta:
#         db_table = 'polish_english_units'

# class PolishSpanishUnits(BaseUnits):
#     class Meta:
#         db_table = 'polish_spanish_units'

# class BaseUnits(models.Model):
# 	units_id = models.AutoField(primary_key=True)
# 	name = models.CharField(max_length=100)
# 	description = models.TextField()
# 	course = models.ForeignKey(AvailableCourse, on_delete=models.CASCADE, null=False)
# 	completed = models.BooleanField(default=False)
# 	unlocked = models.BooleanField(default=False)

# 	class Meta:
# 		abstract = True  # Oznacza, że to jest model abstrakcyjny i nie będzie miał swojej własnej tabeli w bazie danych

# class PolishEnglishUnits(BaseUnits):
#     class Meta:
#         db_table = 'polish_english_units'

# class PolishSpanishUnits(BaseUnits):
#     class Meta:
#         db_table = 'polish_spanish_units'
	
class Test(models.Model):
	test = models.DateField(default=timezone.now)

	def __str__(self):
		return self.test
