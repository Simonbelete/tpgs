from django.shortcuts import render
from django.views import View


class ChickenImportView(View):
    def get(self, request):
        return render(request, 'import/index.html')
