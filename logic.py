import sys
from random import randint
from PyQt6.QtWidgets import QApplication, QStackedWidget
from PyQt6.QtMultimedia import QMediaPlayer, QAudioOutput
from PyQt6.QtCore import QLocale, QTranslator, QTimer, QUrl
from PyQt6.uic import loadUiType

Ui_StackedWidget, QtBaseClass = loadUiType("ui.ui")

class MathTrainer(QStackedWidget, Ui_StackedWidget):
    def __init__(self):
        super(MathTrainer, self).__init__()
        self.setupUi(self)
        self.init_UI()

    def init_UI(self):
        self.player = QMediaPlayer()
        self.audio_output = QAudioOutput()
        self.player.setAudioOutput(self.audio_output)
        
        self.skipped_label_text = self.skipped_label.text()
        self.solved_label_text = self.solved_label.text()
        self.mistakes_label_text = self.mistakes_label.text()

        self.a = randint(10, 99)
        self.b = randint(10, 99)
        self.sign = "+"
        self.var = 10
        
        self.combobox.currentIndexChanged.connect(self.on_combobox_select)
        self.check_button.clicked.connect(self.check_button_click)
        self.skip_button.clicked.connect(self.skip_button_click)

        self.input_field.returnPressed.connect(self.check_button_click)

        self.reset_counters()

    def reset_counters(self):
        self.skipped = 0
        self.solved = 0
        self.mistakes = 0
        
        self.example_label.setText(str(self.a) + self.sign + str(self.b) + "=")
        self.skipped_label.setText(f"{self.skipped_label_text} {self.skipped}")
        self.solved_label.setText(f"{self.solved_label_text} {self.solved}")
        self.mistakes_label.setText(f"{self.mistakes_label_text} {self.mistakes}")

    def on_combobox_select(self, index):
        if index == 0:
            self.sign = "+"
            self.var = 1
        else:
            self.sign = "*"
            self.var = 10

        self.a = int(randint(10, 99)/self.var)
        self.b = int(randint(10, 99)/self.var)
            
        self.reset_counters()
        self.input_field.setText("")
        
    def check_button_click(self):
        if self.sign == "+":
            correct_answer = self.a + self.b
        else:
            correct_answer = self.a * self.b
            
        if self.input_field.text() == str(correct_answer):
            audio_url = QUrl.fromLocalFile("sounds/bell.wav")
            self.player.setSource(audio_url)
            self.player.play()
            
            self.setCurrentIndex(1) # Show result page
            QTimer.singleShot(1000, lambda: self.setCurrentIndex(0)) # Go back
            self.solved = self.solved + 1
            self.solved_label.setText(f"{self.solved_label_text} {self.solved}")
            self.next_example()
        elif self.input_field.text() == "":
            pass
        else:
            audio_url = QUrl.fromLocalFile("sounds/losetrumpet.wav")
            self.player.setSource(audio_url)
            self.player.play()
            
            self.setCurrentIndex(2) # Show result page
            QTimer.singleShot(1000, lambda: self.setCurrentIndex(0)) # Go back
            self.mistakes = self.mistakes + 1
            self.mistakes_label.setText(f"{self.mistakes_label_text} {self.mistakes}")
            self.next_example()

    def skip_button_click(self):
        self.skipped += 1
        self.skipped_label.setText(f"{self.skipped_label_text} {self.skipped}")
        self.next_example()

    def next_example(self):
        self.a = int(randint(10, 99)/self.var)
        self.b = int(randint(10, 99)/self.var)
            
        self.example_label.setText(str(self.a) + self.sign + str(self.b) + "=")
        self.input_field.setText("")
        
if __name__ == "__main__":
    app = QApplication([])

    # Translate app
    locale = QLocale.system().name()
    translator = QTranslator()
    if translator.load(f"locales/ui_{locale}.qm"):
        app.installTranslator(translator)
        
    application = MathTrainer()
    application.show()
    sys.exit(app.exec())
