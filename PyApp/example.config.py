# config.py
import os

# Git repository configuration
GIT_REPO_URL = 'https://github.com/Gloridust/picsite.git'
GIT_LOCAL_PATH = os.path.join(os.getcwd(), 'local_repo')

# File paths
ALBUMS_PATH = os.path.join(GIT_LOCAL_PATH, 'src', 'content', 'albums')
IMAGES_PATH = os.path.join(GIT_LOCAL_PATH, 'public', 'images')

# Git credentials
GIT_USER = 'yourusername'
GIT_TOKEN = 'yourtoken'
