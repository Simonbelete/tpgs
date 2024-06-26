import logging
from django.shortcuts import render, redirect
from django.views import View
from django.contrib import messages
from django.contrib.auth.models import Group, Permission
from django.contrib.auth import authenticate, logout, login, update_session_auth_hash
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.forms import PasswordResetForm, PasswordChangeForm, SetPasswordForm
from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse
from django.template.loader import render_to_string
from django.db.models.query_utils import Q
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.contrib.auth.mixins import PermissionRequiredMixin


from users.forms import LoginForm, UserForm, UserCredentialForm
from .models import User
from farms.models import Farm


class LoginView(View):
    def get(self, request):
        if request.user.is_authenticated:
            return redirect('dashboard')
        form = LoginForm()
        return render(request, 'login/index.html', {'form': form})

    def post(self, request):
        form = LoginForm(request.POST)
        if form.is_valid():
            user = authenticate(
                request, email=form.cleaned_data['email'], password=form.cleaned_data['password'],)
            if user is not None:
                login(request, user)
                return redirect('dashboard')
            else:
                messages.error(request, f'No user found')
        return render(request, 'login/index.html', {'form': form})


class LogoutView(View):
    def get(self, request):
        logout(request)
        return redirect('index')


class ChangePassword(LoginRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'

    def get(self, request):
        form = PasswordChangeForm(request.user)
        return render(request, 'users/change_password.html', {"form": form})

    def post(self, request):
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)  # Important!
            messages.success(
                request, 'Your password was successfully updated!')
            return redirect('dashboard')
        else:
            messages.error(request, 'Please correct the error below.')
        return render(request, 'users/change_password.html', {"form": form})


class ChangeUserPassword(PermissionRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'
    permission_required = ('users.change_user')

    def get(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            user = User.objects.get(pk=id)
            form = SetPasswordForm(user)
            return render(request, 'password/change_password.html', {"form": form, "user": user})
        except Exception as ex:
            return redirect('500')

    def post(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            user = User.objects.get(pk=id)
            form = SetPasswordForm(user, request.POST)
            if form.is_valid():
                user = form.save()
                messages.success(
                    request, 'Password was successfully updated!')
                return redirect('users')
            else:
                messages.error(request, 'Please correct the error below.')
            return render(request, 'password/change_password.html', {"form": form})
        except Exception as ex:
            return redirect('500')


class UsersView(PermissionRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'
    permission_required = ('users.view_user')

    def get(self, request):
        return render(request, 'users/users_list.html')


class UsersCreateView(PermissionRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'
    permission_required = ('users.add_user',)
    logger = logging.getLogger(__name__)

    def get(self, request):
        form = UserCredentialForm()
        return render(request, 'users/create.html', {'form': form})

    def post(self, request):
        form = UserCredentialForm(request.POST)
        if form.is_valid():
            user = User.objects.create_user(
                form.cleaned_data['email'], form.cleaned_data['password'], name=form.cleaned_data['name'])
            for farm in form.cleaned_data['farms']:
                user.farms.add(farm)
                user.save()
            for farm_group in form.cleaned_data['groups']:
                farm_group.user_set.add(user)
            if user is not None:
                self.logger.error('Failed to create user')
                return redirect('users')
            else:
                messages.error(request, f'Error occurred while creating user')
        return render(request, 'users/create.html', {'form': form})


class UsersEditView(PermissionRequiredMixin, View):
    login_url = '/users/login'
    redirect_field_name = 'redirect_to'
    permission_required = ('users.delete_user', 'users.change_user',)

    def get(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = User.objects.get(pk=id)
            if (data.is_superuser == True):
                return redirect('404')
            form = UserForm(instance=data)
            return render(request, 'users/edit.html', {'form': form, "id": id, "data": data, "password_change": PasswordChangeForm})
        except Exception as ex:
            print(ex)
            return redirect('500')

    def post(self, request, id=0):
        if id == 0:
            return redirect('404')
        try:
            data = User.objects.get(pk=id)
            form = UserForm(request.POST, instance=data)
            if (data.is_superuser == True):
                return redirect('404')
            if form.is_valid():
                form.save()
                return redirect('users')
            else:
                messages.error(request, "Error, please check your data")
            return render(request, 'users/edit.html', {'form': form, "id": id, "password_change": PasswordChangeForm})
        except Exception as ex:
            return redirect('500')


class PasswordReset(View):
    def get(self, request):
        form = PasswordResetForm()
        return render(request, 'password/password_reset.html', {'form': form})

    def post(self, request):
        form = PasswordResetForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data['email']
            associated_users = User.objects.filter(Q(email=data))
            if associated_users.exists():
                for user in associated_users:
                    subject = "Password Reset Requested"
                    email_template_name = "password/password_reset_email.txt"
                    c = {
                        "email": user.email,
                        'domain': '127.0.0.1:8000',
                        'site_name': 'Website',
                        "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                        "user": user,
                        'token': default_token_generator.make_token(user),
                        'protocol': 'http',
                    }
                    email = render_to_string(email_template_name, c)
                    try:
                        send_mail(subject, email, 'admin@example.com',
                                  [user.email], fail_silently=False)
                    except BadHeaderError:
                        return HttpResponse('Invalid header found.')
                    return redirect("/password_reset/done/")
            else:
                messages.warning(
                    request, 'Email address isn\'t registered yet')
        return render(request, 'password/password_reset.html', {'form': form})
