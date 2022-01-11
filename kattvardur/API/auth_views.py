from django.contrib.auth import authenticate, login, logout
from django.http.response import JsonResponse
from People.serializers import PersonSerializer
import json

def Login(request):
    print(request.user)
    if request.method != "POST":
        return JsonResponse({"msg":"Method Not Allowed"}, status = 405)
    body = json.loads(request.body)
    print("bod",body)
    if 'user' not in body or 'password' not in body:
        return JsonResponse({"error":"Authentication Failed"},  status=401)
    u = body['user']
    p = body['password']
    user = authenticate(username = u, password = p)
    if user is not None:
        if user.person is not None:
            login(request, user)
            return JsonResponse(PersonSerializer(user.person).data, status = 200)
        return JsonResponse({"msg:authenticated"},status=200)
    else:
        return JsonResponse({"error":"Authentication Failed"},  status=401)

def Logout(request):
    if request.user.is_authenticated():
        logout(request)
        return JsonResponse({}, status=200)
    else:
        return JsonResponse({}, status = 401)