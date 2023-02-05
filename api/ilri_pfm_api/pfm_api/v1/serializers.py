from rest_framework import serializers
from rest_framework import exceptions

from pfm_api.models import User, Device, Farm, Chicken, ChickenParent, BreedType, ChickenStage, ChickenProgress, Egg, LayedPlace, ChickenGrowth
import pfm_api.models as Model
from pfm_api.firebase_messageing import FirebaseMessaging

class DeviceSerializer(serializers.ModelSerializer):
    token = serializers.CharField()

    class Meta:
        model = Device
        fields = ['token', 'is_active']

class UserSerializer(serializers.ModelSerializer):
    devices = DeviceSerializer(many=True)
    uid = serializers.CharField()
    email = serializers.CharField()
    is_farmer = serializers.BooleanField()

    class Meta:
        model = User
        fields = ['name', 'email', 'uid', 'is_admin', 'is_admin', 'is_staff', 'is_farmer', 'is_approved', 'devices']

    def create(self, validated_data):
        device_data = validated_data.pop('devices')
        user = User.objects.create(**validated_data)

        for device in device_data:
            Device.objects.create(user=user, **device)

        admin_user = User.objects.filter(is_admin=True)
        for a in admin_user:
            admin_devices = Device.objects.filter(user=a.id)
            for device in admin_devices:
                FirebaseMessaging().send_message(token=device.token, title="Title", body="body")

        return user

class FarmSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    is_active = serializers.BooleanField(default=True)
    create_by = serializers.ReadOnlyField(source='created_by.id')

    class Meta:
        model = Farm
        fields = ['id', 'name', 'is_active', 'create_by']

class EggSerializer(serializers.ModelSerializer):
    week = serializers.IntegerField()

    class Meta:
        model = Egg
        fields = '__all__'

class BreedTypeSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    color = serializers.CharField()
    is_active = serializers.BooleanField(default=True)

    class Meta:
        model = BreedType
        fields = ['id', 'name', 'color', 'is_active']

class ChickenProgressSerializer(serializers.ModelSerializer):
    week = serializers.IntegerField()
    weight = serializers.DecimalField(max_digits = 6, decimal_places = 3)
    
    class Meta:
        model = ChickenProgress
        fields = ['id', 'week', 'weight']

class ChickenGrowthSerializer(serializers.ModelSerializer):
    week = serializers.IntegerField()
    date = serializers.DateField()
    weight = serializers.DecimalField(max_digits = 6, decimal_places = 3)
    chicken = serializers.PrimaryKeyRelatedField(read_only=False, queryset=Chicken.objects.all())
    
    class Meta:
        model = ChickenGrowth
        fields = ['id', 'weight', 'date', 'chicken', 'week']


class ChickenSerializer_GET(serializers.ModelSerializer):
    breed_type = BreedTypeSerializer()
    class Meta:
        model = Chicken
        fields = ['id', 'tag', 'breed_type']

class ChickenSerializer(serializers.ModelSerializer):
    tag = serializers.CharField()
    breed_type = serializers.PrimaryKeyRelatedField(read_only=False, queryset=BreedType.objects.all())

    progress = ChickenProgressSerializer(many=True, read_only=True)

    class Meta:
        model = Chicken
        fields = ['tag',  'breed_type', 'progress']

    # def create(self, validated_data):
    #     breed_type_data = validated_data.pop('breed_type', None)
    #     breed_type = validated_data.pop('breed_type_id', None)
    #     if breed_type_data is not None:
    #         breed_type = BreedType.objects.create(**breed_type_data)
    #         breed_type = breed_type.id
    #     print('--------------------------------------------------')
    #     print(breed_type)
    #     chicken = Chicken.objects.create(**validated_data, breed_type=breed_type)
    #     return chicken

class ChickenParentSerializer(serializers.ModelSerializer):
    is_active = serializers.BooleanField()

    class Meta:
        model = ChickenParent
        fields = '__all__'

class ChickenStageSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    is_active = serializers.BooleanField()

    class Meta:
        model = ChickenStage
        fields = ['id', 'name', 'is_active']

class LayedPlaceSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    is_active = serializers.BooleanField()

    class Meta:
        model = LayedPlace
        fields = ['id', 'name', 'is_active']

## Egg Serializer
class EggPostSerializer(serializers.ModelSerializer):
    chicken = ChickenSerializer()


class EggSerializer(serializers.ModelSerializer):
    chicken = ChickenSerializer_GET()
    # chicken_id = serializers.PrimaryKeyRelatedField(read_only=False, queryset=Chicken.objects.all(), allow_null=True)
    # chicken_id = serializers.IntegerField(source='chicken.id', allow_null=True)
    date = serializers.DateField()

    class Meta:
        model = Egg
        fields = ['date', 'chicken']

    def create(self, validated_data):
        chicken_data = validated_data.pop('chicken')
        print('------------------------------------')
        print(chicken_data)
        # chicken = ChickenSerializer(data=chicken_data).create(validated_data=chicken_data)
        # chicken = ChickenSerializer(data=chicken_data)
        # chicken.is_valid(raise_exception=True)
        # chicken.save(created_by=self.context['request'].user)
        chicken = Chicken.objects.create(**chicken_data, created_by=self.context['request'].user)
        egg = Egg.objects.create(**validated_data, chicken=chicken)

        # chicken = Chicken.objects.create(**chicken_data)
        # chicken = ChickenSerializer(data=chicken_data)
        # chicken.is_valid(raise_exception=True)
        # chicken.save()
        return egg

        # chicken_data = validated_data.pop('chicken', None)
        # chicken_pk = validated_data.pop('chicken_id', None)
        # print(chicken_data)
        # if chicken_pk is None:
        #     print('+++++++++++++++++++++++++++++')
        #     chicken_data['breed_type_id'] = chicken_data['breed_type_id'].id
        #     # print(chicken_data)
        #     # chicken = ChickenSerializer(data=chicken_data)
        #     # chicken.is_valid(raise_exception=True)
        #     # chicken.save()
        #     chicken = Chicken.objects.create(**chicken_data)
        # egg = Egg.objects.create(**validated_data, chicken=chicken)
        # return egg

## Reports
class BreedTypeReportPercentageSerializer(serializers.ModelSerializer):
    chicken_count = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = BreedType
        fields = '__all__'

## Feed Type
class FeedType_GET(serializers.ModelSerializer):
    class Meta:
        model = Model.FeedType
        fields = '__all__'

class FeedType_POST(serializers.ModelSerializer):
    name = serializers.CharField()
    is_active = serializers.BooleanField(default=True)

    class Meta:
        model = Model.FeedType
        fields = ['name', 'is_active']

class Feed_GET(serializers.ModelSerializer):
    class Meta:
        model = Model.Feed
        fields = '__all__'

class Feed_POST(serializers.ModelSerializer):
    chicken = serializers.PrimaryKeyRelatedField(read_only=False, queryset=Model.Chicken.objects.all())
    date = serializers.DateField()
    weight = serializers.DecimalField(max_digits = 6, decimal_places = 3)

    class Meta:
        model = Model.Feed
        fields = ['chicken', 'date', 'weight']