from rest_framework import serializers

import api.models as models

############################ Users ############################


class UserSerializer_GET_V1(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['id', 'name', 'email']


class UserSerializer_POST_V1(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['id', 'name', 'email']


############################ Country ############################


class CountrySerializer_GET_V1(serializers.ModelSerializer):
    class Meta:
        model = models.Country
        fields = '__all__'


class CountrySerializer_POST_V1(serializers.ModelSerializer):
    name = serializers.CharField()

    class Meta:
        model = models.Country
        fields = ['name']


############################ City ############################

class CitySerializer_GET_V1(serializers.ModelSerializer):
    class Meta:
        model = models.City
        fields = '__all__'


class CitySerializer_POST_V1(serializers.ModelSerializer):
    name = serializers.CharField()
    country = serializers.PrimaryKeyRelatedField(
        read_only=False, queryset=models.Country.objects.all())

    class Meta:
        model = models.City
        fields = ['name', 'country']


############################ Farm ############################

class FarmSerializer_GET_V1(serializers.ModelSerializer):
    class Meta:
        model = models.Farm
        fields = '__all__'


class FarmSerializer_POST_V1(serializers.ModelSerializer):
    name = serializers.CharField()
    city = serializers.PrimaryKeyRelatedField(
        read_only=False, queryset=models.City.objects.all())
    is_active = serializers.BooleanField()

    class Meta:
        model = models.Farm
        fields = ['name', 'city', 'is_active']


class FarmHistory(serializers.ModelSerializer):
    history_user = UserSerializer_GET_V1()
    name = serializers.CharField()

    class Meta:
        model = models.Farm.history.__dict__['model']
        fields = '__all__'


############################ House ############################

class HouseSerializer_GET_V1(serializers.ModelSerializer):
    class Meta:
        model = models.House
        fields = '__all__'


class HouseSerializer_POST_V1(serializers.ModelSerializer):
    name = serializers.CharField()
    farm = serializers.PrimaryKeyRelatedField(
        read_only=False, queryset=models.Farm.objects.all())
    is_active = serializers.BooleanField()

    class Meta:
        model = models.House
        fields = ['name', 'farm', 'is_active']


############################ Breed Type ############################
class BreedTypeSerializer_Statics(serializers.ModelSerializer):
    chicken_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = models.BreedType
        fields = '__all__'


class BreedTypeSerializer_GET_V1(serializers.ModelSerializer):
    class Meta:
        model = models.BreedType
        fields = '__all__'


class BreedTypeSerializer_POST_V1(serializers.ModelSerializer):
    name = serializers.CharField()
    color = serializers.CharField()
    is_active = serializers.BooleanField(default=True)

    class Meta:
        model = models.BreedType
        fields = ['name', 'color', 'is_active']

############################ Stage ############################


class StageSerializer_GET_V1(serializers.ModelSerializer):
    class Meta:
        model = models.Stage
        fields = '__all__'


class StageSerializer_POST_V1(serializers.ModelSerializer):
    name = serializers.CharField()
    min_week = serializers.IntegerField()
    max_week = serializers.IntegerField()

    class Meta:
        model = models.Stage
        fields = ['name', 'min_week', 'max_week']


############################ Layed Place ############################

class LayedPlaceSerializer_GET_V1(serializers.ModelSerializer):
    class Meta:
        model = models.LayedPlace
        fields = '__all__'


class LayedPlaceSerializer_POST_V1(serializers.ModelSerializer):
    name = serializers.CharField()
    is_active = serializers.BooleanField(default=True)

    class Meta:
        model = models.LayedPlace
        fields = ['name', 'is_active']


############################ Chicken ############################

class ChickenSerializer_GET_V1(serializers.ModelSerializer):
    first_egg_lay_week = serializers.CharField()
    first_egg_lay_date = serializers.DateField()
    first_egg_lay_days = serializers.DecimalField(
        max_digits=6, decimal_places=2)
    days_in_production = serializers.DecimalField(
        max_digits=6, decimal_places=2)
    farm = FarmSerializer_GET_V1()
    house = HouseSerializer_GET_V1()
    breed_type = BreedTypeSerializer_GET_V1()

    class Meta:
        model = models.Chicken
        fields = ['id', 'tag', 'sex', 'layed_date', 'is_double_yolk',
                  'is_active', 'created_at', 'farm', 'house', 'breed_type', 'layed_place',
                  'first_egg_lay_week', 'first_egg_lay_date', 'first_egg_lay_days', 'days_in_production']


class ChickenSerializer_POST_V1(serializers.ModelSerializer):
    tag = serializers.CharField()
    sex = serializers.CharField()
    farm = serializers.PrimaryKeyRelatedField(
        read_only=False, queryset=models.Farm.objects.all())
    house = serializers.PrimaryKeyRelatedField(
        read_only=False, queryset=models.House.objects.all())
    breed_type = serializers.PrimaryKeyRelatedField(
        read_only=False, queryset=models.BreedType.objects.all())
    layed_place = serializers.PrimaryKeyRelatedField(
        read_only=False, queryset=models.LayedPlace.objects.all())
    layed_date = serializers.DateField()
    is_double_yolk = serializers.BooleanField()
    flock = serializers.PrimaryKeyRelatedField(
        read_only=False, allow_null=True, queryset=models.Flock.objects.all())

    class Meta:
        model = models.Chicken
        fields = ['tag', 'sex', 'farm', 'house', 'breed_type',
                  'layed_place', 'layed_date', 'is_double_yolk', 'flock']


class ChickenHistory(serializers.ModelSerializer):
    history_user = UserSerializer_GET_V1()
    house = HouseSerializer_GET_V1()
    farm = FarmSerializer_GET_V1()
    breed_type = BreedTypeSerializer_GET_V1()

    class Meta:
        model = models.Chicken.history.__dict__['model']
        fields = '__all__'

############################ Breed Pair ############################


class BreedPairSerializer_GET_V1(serializers.ModelSerializer):
    class Meta:
        model = models.Stage
        fields = '__all__'


class BreedPairSerializer_POST_V1(serializers.ModelSerializer):
    father = serializers.PrimaryKeyRelatedField(
        read_only=False, queryset=models.Chicken.objects.all())
    mother = serializers.PrimaryKeyRelatedField(
        read_only=False, queryset=models.Chicken.objects.all())
    date = serializers.DateField()

    class Meta:
        model = models.BreedPair
        fields = ['father', 'mother', 'date']


############################ Weight ############################

class WeightSerializer_GET_V1(serializers.ModelSerializer):
    chicken = ChickenSerializer_GET_V1()

    class Meta:
        model = models.Weight
        fields = '__all__'


class WeightSerializer_POST_V1(serializers.ModelSerializer):
    week = serializers.IntegerField()
    weight = serializers.DecimalField(max_digits=6, decimal_places=3)
    chicken = serializers.PrimaryKeyRelatedField(
        read_only=False, queryset=models.Chicken.objects.all())

    class Meta:
        model = models.Weight
        fields = ['week', 'weight', 'chicken']


############################ Egg ############################

class EggSerializer_GET_V1(serializers.ModelSerializer):
    class Meta:
        model = models.Egg
        fields = '__all__'


class EggSerializer_POST_V1(serializers.ModelSerializer):
    date = serializers.DateField()
    chicken = serializers.PrimaryKeyRelatedField(
        read_only=False, queryset=models.Chicken.objects.all())

    class Meta:
        model = models.Egg
        fields = ['date', 'chicken']


############################ Feed Type ############################

class FeedTypeSerializer_GET_V1(serializers.ModelSerializer):
    class Meta:
        model = models.FeedType
        fields = '__all__'


class FeedTypeSerializer_POST_V1(serializers.ModelSerializer):
    name = serializers.CharField()
    is_active = serializers.BooleanField(default=True)

    class Meta:
        model = models.FeedType
        fields = ['name', 'is_active']


############################ Feed Type ############################

class FeedSerializer_GET_V1(serializers.ModelSerializer):
    class Meta:
        model = models.Feed
        fields = '__all__'


class FeedSerializer_POST_V1(serializers.ModelSerializer):
    date = serializers.DateField()
    chicken = serializers.PrimaryKeyRelatedField(
        read_only=False, queryset=models.Chicken.objects.all())
    feed_type = serializers.PrimaryKeyRelatedField(
        read_only=False, queryset=models.FeedType.objects.all())

    class Meta:
        model = models.Feed
        fields = ['date', 'chicken', 'feed_type']


############################ Flock Type ############################
class FlockSerializer_GET_V1(serializers.ModelSerializer):
    name = serializers.CharField()
    hatch_date = serializers.DateField()
    farm = FarmSerializer_GET_V1()
    chickens = ChickenSerializer_GET_V1(many=True)
    breed_type = BreedTypeSerializer_GET_V1()

    class Meta:
        model = models.Flock
        fields = ['id', 'name', 'breed_type',
                  'hatch_date', 'farm', 'chickens', 'created_at', 'is_active']


class FlockSerializer_POST_V1(serializers.ModelSerializer):
    name = serializers.CharField()
    hatch_date = serializers.DateField()
    farm = serializers.PrimaryKeyRelatedField(
        read_only=False, queryset=models.Farm.objects.all())

    class Meta:
        model = models.Flock
        fields = ['name', 'hatch_date', 'farm']


class FlockHistory(serializers.ModelSerializer):
    history_user = UserSerializer_GET_V1()
    farm = FarmSerializer_GET_V1()
    breed_type = BreedTypeSerializer_GET_V1()

    class Meta:
        model = models.Flock.history.__dict__['model']
        fields = '__all__'
