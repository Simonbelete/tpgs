from rest_framework import serializers
from rest_framework import exceptions

from pfm_api.models import User, Device, Farm, Chicken, ChickenParent, BreedType, ChickenStage, Egg, LayedPlace
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
    is_active = serializers.BooleanField()

    class Meta:
        model = BreedType
        fields = ['id', 'name', 'is_active']

class ChickenSerializer(serializers.ModelSerializer):
    # children = EggSerializer(many=True) 
    tag = serializers.CharField()
    breed_type = serializers.PrimaryKeyRelatedField(read_only=False, queryset=BreedType.objects.all())

    class Meta:
        model = Chicken
        fields = ['tag',  'breed_type']

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

# class PollSerializer(serializers.ModelSerializer):
#     question = serializers.CharField()
#     pub_date = serializers.DateTimeField()
#     owner = serializers.ReadOnlyField(source='owner.id')

#     class Meta:
#         model = Poll
#         fields = ['question', 'pub_date', 'owner']