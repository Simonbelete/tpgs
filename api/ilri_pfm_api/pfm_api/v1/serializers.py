from rest_framework import serializers
from rest_framework import exceptions
from django.contrib.auth.models import User
from pfm_api.models import UserProfile, Farm

class UserProfileSerializer(serializers.ModelSerializer):
    bio = serializers.CharField(max_length=200)

    class Meta:
        model = UserProfile
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):    
    userprofile = UserProfileSerializer()
    def update(self, instance,validated_data):
        if(not instance.username == 
                        self.context['request'].user.username):
            raise exceptions.PermissionDenied('You do not have permission to update')
        profile_data = validated_data.pop('userprofile')
        if(not hasattr(instance,'userprofile')):
            instance.userprofile = UserProfile.objects.create(user=instance,**profile_data)
        else:
            instance.userprofile.dob = profile_data["dob"]
            instance.userprofile.bio = profile_data["bio"]
            instance.userprofile.save()
        instance.first_name = validated_data.get('first_name',instance.first_name)
        instance.last_name = validated_data.get('last_name',instance.last_name)
        instance.email = validated_data.get('email',instance.email)
        instance.save()
        return instance
        
    class Meta:
        model = User
        fields = ['last_name','first_name','userprofile']

class FarmSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    code = serializers.CharField()

    class Meta:
        model = Farm
        fields = '__all__'