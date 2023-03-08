from django.http import HttpResponse
from django.shortcuts import redirect
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from .models import CustomUser

# @api_view(['POST'])
# def login(request):
#     email = request.data.get('email')
#     password = request.data.get('password')
#     user = authenticate(request, username=email, password=password)
#     if user is not None:
#         login(request, user)
#         token, created = Token.objects.get_or_create(user=user)
#         return Response({'token': token.key})
#     else:
#         return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


def homepage(request):
    if 'user' in request.session:
        curren_user = request.session['user']
        param = {'current_user': curren_user}
    else:
        return redirect('login')
    
    
def login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        check_user = CustomUser.objects.filter(username=email, password=password)
        if check_user:
            request.session['user'] = email
            return redirect('homepage')
        else:
            return HttpResponse('Please enter a valid email or password')


# @api_view(['POST'])
def logout(request):
    try:
      del request.session['user']
    except:
      pass
    return HttpResponse("<strong>You are logged out.</strong>")


def registration(request):
    if request.method == 'POST':
        fname = request.POST.get('first-name')
        lname = request.POST.get('last-name')
        email = request.POST.get('email')
        password = request.POST.get('password')
        if CustomUser.objects.filter(username=email).count() > 0:
            return HttpResponse('Username already exists.')
        else:
            user = CustomUser(username=email, password=password)
            user.save()
            return redirect('login')