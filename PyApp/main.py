import sys
import os
import git
import shutil
import markdown
import yaml
from PyQt5.QtWidgets import QApplication, QWidget, QVBoxLayout, QPushButton, QLabel, QGridLayout, QFileDialog, QLineEdit, QFormLayout, QDialog, QProgressDialog, QMainWindow
from PyQt5.QtGui import QPixmap, QFont
from PyQt5.QtCore import Qt, QThread, pyqtSignal
import qtawesome as qta
import qdarkstyle
from config import GIT_REPO_URL, GIT_LOCAL_PATH, ALBUMS_PATH, IMAGES_PATH, GIT_USER, GIT_TOKEN

class GitHandler(QThread):
    progress = pyqtSignal(int)
    finished = pyqtSignal()

    def __init__(self):
        super().__init__()
        self.repo = None

    def remove_readonly(self, func, path, excinfo):
        os.chmod(path, 0o777)
        func(path)

    def clone_repo(self):
        if os.path.exists(GIT_LOCAL_PATH):
            shutil.rmtree(GIT_LOCAL_PATH, onerror=self.remove_readonly)
        self.repo = git.Repo.clone_from(GIT_REPO_URL, GIT_LOCAL_PATH)

    def run(self):
        self.progress.emit(10)
        self.clone_repo()
        self.progress.emit(100)
        self.finished.emit()

class AlbumApp(QMainWindow):
    def __init__(self):
        super().__init__()
        self.initUI()

        self.git_handler = GitHandler()
        self.git_handler.progress.connect(self.update_progress)
        self.git_handler.finished.connect(self.on_loading_finished)
        self.show_loading_dialog()
        self.git_handler.start()

    def show_loading_dialog(self):
        self.loading_dialog = QProgressDialog("加载中...", None, 0, 100, self)
        self.loading_dialog.setWindowTitle("请稍候")
        self.loading_dialog.setWindowModality(Qt.WindowModal)
        self.loading_dialog.setMinimumDuration(0)
        self.loading_dialog.setValue(0)
        self.loading_dialog.show()

    def update_progress(self, value):
        self.loading_dialog.setValue(value)

    def on_loading_finished(self):
        self.loading_dialog.close()
        self.load_albums()

    def initUI(self):
        self.setWindowTitle('Album Viewer')
        self.setGeometry(100, 100, 800, 600)
        self.main_widget = QWidget()
        self.setCentralWidget(self.main_widget)
        self.layout = QVBoxLayout(self.main_widget)

        self.title_label = QLabel('我的相册')
        self.title_label.setFont(QFont('Arial', 20))
        self.title_label.setAlignment(Qt.AlignCenter)
        self.layout.addWidget(self.title_label)

        self.grid_layout = QGridLayout()
        self.grid_layout.setSpacing(20)
        self.layout.addLayout(self.grid_layout)

        self.new_album_button = QPushButton('新建相册')
        self.new_album_button.setStyleSheet("padding: 10px; font-size: 16px;")
        self.new_album_button.setIcon(qta.icon('fa.plus'))
        self.new_album_button.clicked.connect(self.create_new_album)
        self.layout.addWidget(self.new_album_button, alignment=Qt.AlignCenter)

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
            label.setPixmap(pixmap.scaled(200, 200, Qt.KeepAspectRatio, Qt.SmoothTransformation))
            label.mousePressEvent = lambda event, a=album: self.open_album(a)
            self.grid_layout.addWidget(label, i // 3, (i % 3) * 2)

            album_info = QLabel(f"{album['name']}\n{album['date']}")
            album_info.setFont(QFont('Arial', 14))
            album_info.setAlignment(Qt.AlignCenter)
            self.grid_layout.addWidget(album_info, i // 3, (i % 3) * 2 + 1)

    def open_album(self, album):
        self.album_view = AlbumView(album, self.git_handler)
        self.album_view.show()

    def create_new_album(self):
        dialog = QDialog(self)
        dialog.setWindowTitle('新建相册')
        dialog.setGeometry(200, 200, 400, 300)
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
        self.image_button.setStyleSheet("padding: 5px; font-size: 14px;")
        self.image_button.setIcon(qta.icon('fa.image'))
        self.image_button.clicked.connect(self.select_cover_image)
        dialog_layout.addWidget(self.image_button)

        save_button = QPushButton('保存')
        save_button.setStyleSheet("padding: 10px; font-size: 16px;")
        save_button.setIcon(qta.icon('fa.save'))
        save_button.clicked.connect(self.save_album)
        dialog_layout.addWidget(save_button, alignment=Qt.AlignCenter)

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

class AlbumView(QWidget):
    def __init__(self, album, git_handler):
        super().__init__()
        self.album = album
        self.git_handler = git_handler
        self.initUI()

    def initUI(self):
        self.setWindowTitle(self.album['name'])
        self.setGeometry(100, 100, 800, 600)
        self.layout = QVBoxLayout()
        self.grid_layout = QGridLayout()
        self.grid_layout.setSpacing(20)

        self.load_images()

        self.add_image_button = QPushButton('添加照片')
        self.add_image_button.setStyleSheet("padding: 10px; font-size: 16px;")
        self.add_image_button.setIcon(qta.icon('fa.plus'))
        self.add_image_button.clicked.connect(self.add_image)

        self.layout.addLayout(self.grid_layout)
        self.layout.addWidget(self.add_image_button, alignment=Qt.AlignCenter)
        self.setLayout(self.layout)

    def load_images(self):
        md_content = ""
        with open(self.album['path'], 'r', encoding='utf-8') as file:
            md_content = file.read()
        
        image_paths = md_content.split('---')[2].strip().split('\n')
        for i, image_path in enumerate(image_paths):
            image_full_path = os.path.join(GIT_LOCAL_PATH, 'public', image_path[1:])
            pixmap = QPixmap(image_full_path)
            label = QLabel()
            label.setPixmap(pixmap.scaled(200, 200, Qt.KeepAspectRatio, Qt.SmoothTransformation))
            self.grid_layout.addWidget(label, i // 3, i % 3)

    def add_image(self):
        options = QFileDialog.Options()
        file_path, _ = QFileDialog.getOpenFileName(self, "选择照片", "", "Images (*.png *.jpg *.jpeg *.webp)", options=options)
        if file_path:
            image_name = os.path.basename(file_path)
            album_folder = os.path.join(IMAGES_PATH, self.album['id'])
            image_dest = os.path.join(album_folder, image_name)
            shutil.copy(file_path, image_dest)

            with open(self.album['path'], 'a', encoding='utf-8') as file:
                file.write(f"- /images/{self.album['id']}/{image_name}\n")

            self.git_handler.commit_and_push('添加照片')
            self.load_images()

if __name__ == '__main__':
    app = QApplication(sys.argv)
    app.setStyleSheet(qdarkstyle.load_stylesheet_pyqt5())  # 使用 qdarkstyle 主题
    ex = AlbumApp()
    ex.show()
    sys.exit(app.exec_())
