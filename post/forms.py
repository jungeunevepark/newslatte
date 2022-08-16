from django import forms 
from .models import Post, Comment
from django_summernote.widgets import SummernoteWidget

class PostForm(forms.ModelForm):
    class Meta:
        model = Post 
        fields = ['title', 'content', 'tag']
        widgets = {
            'content': SummernoteWidget()
        }

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields= ['comment']

