import sys
import os
import git
import shutil
import markdown
import yaml
from PyQt5.QtWidgets import QApplication, QWidget, QVBoxLayout, QPushButton, QLabel, QGridLayout, QFileDialog, QLineEdit, QFormLayout, QDialog
from PyQt5.QtGui import QPixmap
from config import GIT_REPO_URL, GIT_LOCAL_PATH, ALBUMS_PATH, IMAGES_PATH, GIT_USER, GIT_TOKEN

class GitHandler:
    def __init__(self):
        self.repo = None

    def clone_repo(self):
        if os.path.exists(GIT_LOCAL_PATH):
            shutil.rmtree(GIT_LOCAL_PATH)
        self.repo = git.Repo.clone_from(GIT_REPO_URL, GIT_LOCAL_PATH)

    def commit_and_push(self, message):
        self.repo.git.add(A=True)
        self.repo.index.commit(message)
        origin = self.repo.remote(name='origin')
        origin.push()

class AlbumApp(QWidget):
    def __init__(self):
        super().__init__()
        self.initUI()
        self.git_handler = GitHandler()
        self.git_handler.clone_repo()
        self.load_albums()

    def initUI(self):
        self.setWindowTitle('Album Viewer')
        self.layout = QVBoxLayout()
        self.grid_layout = QGridLayout()

        self.new_album_button = QPushButton('新建相册')
        self.new_album_button.clicked.connect(self.create_new_album)

        self.layout.addLayout(self.grid_layout)
        self.layout.addWidget(self.new_album_button)
        self.setLayout(self.layout)

    def load_albums(self):
        self.albums = []
        for file_name in os.listdir(ALBUMS_PATH):
            if file_name.endswith('.md'):
                file_path = os.path.join(ALBUMS_PATH, file_name)
                with open(file_path, 'r', encoding='utf-8') as file:
                    content = file.read()
                    album = yaml.safe_load(content.split('---')[1])
                    album['path'] = file_path
                    self.albums.append(album)

        self.display_albums()

    def display_albums(self):
        for i, album in enumerate(self.albums):
            cover_image_path = os.path.join(GIT_LOCAL_PATH, 'public', album['coverImage'][1:])
            pixmap = QPixmap(cover_image_path)
            label = QLabel()
            label.setPixmap(pixmap.scaled(100, 100))
            self.grid_layout.addWidget(label, i // 3, (i % 3) * 2)
            album_info = QLabel(f"{album['name']}\n{album['date']}")
            self.grid_layout.addWidget(album_info, i // 3, (i % 3) * 2 + 1)

    def create_new_album(self):
        dialog = QDialog(self)
        dialog.setWindowTitle('新建相册')
        dialog_layout = QVBoxLayout()

        form_layout = QFormLayout()
        self.id_edit = QLineEdit()
        self.name_edit = QLineEdit()
        self.date_edit = QLineEdit()
        self.description_edit = QLineEdit()
        form_layout.addRow('ID:', self.id_edit)
        form_layout.addRow('名称:', self.name_edit)
        form_layout.addRow('日期:', self.date_edit)
        form_layout.addRow('描述:', self.description_edit)
        dialog_layout.addLayout(form_layout)

        self.image_button = QPushButton('选择封面图片')
        self.image_button.clicked.connect(self.select_cover_image)
        dialog_layout.addWidget(self.image_button)

        save_button = QPushButton('保存')
        save_button.clicked.connect(self.save_album)
        dialog_layout.addWidget(save_button)

        dialog.setLayout(dialog_layout)
        dialog.exec_()

    def select_cover_image(self):
        options = QFileDialog.Options()
        file_path, _ = QFileDialog.getOpenFileName(self, "选择封面图片", "", "Images (*.png *.jpg *.jpeg *.webp)", options=options)
        if file_path:
            self.cover_image_path = file_path

    def save_album(self):
        album_id = self.id_edit.text()
        album_name = self.name_edit.text()
        album_date = self.date_edit.text()
        album_description = self.description_edit.text()
        cover_image_name = os.path.basename(self.cover_image_path)

        album_folder = os.path.join(IMAGES_PATH, album_id)
        os.makedirs(album_folder, exist_ok=True)
        cover_image_dest = os.path.join(album_folder, cover_image_name)
        shutil.copy(self.cover_image_path, cover_image_dest)

        album_data = {
            'id': album_id,
            'name': album_name,
            'date': album_date,
            'description': album_description,
            'coverImage': f'/images/{album_id}/{cover_image_name}'
        }

        album_md_path = os.path.join(ALBUMS_PATH, f'{album_id}.md')
        with open(album_md_path, 'w', encoding='utf-8') as file:
            file.write('---\n')
            yaml.dump(album_data, file)
            file.write('---\n')
            file.write(f"- /images/{album_id}/{cover_image_name}\n")

        self.git_handler.commit_and_push('新增相册')
        self.load_albums()

if __name__ == '__main__':
    app = QApplication(sys.argv)
    ex = AlbumApp()
    ex.show()
    sys.exit(app.exec_())
