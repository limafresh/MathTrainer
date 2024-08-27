import sys
from random import randint
from PyQt6.QtWidgets import QApplication, QStackedWidget
from PyQt6.QtMultimedia import QMediaPlayer, QAudioOutput
from PyQt6.QtCore import QLocale, QTranslator, QTimer, QUrl
from ui import Ui_StackedWidget

class MathTrainer(QStackedWidget):
    def __init__(self):
        super().__init__()
        self.ui = Ui_StackedWidget()
        self.ui.setupUi(self)
        self.init_UI()

    def init_UI(self):
        self.player = QMediaPlayer()
        self.audio_output = QAudioOutput()
        self.player.setAudioOutput(self.audio_output)
        
        self.skipped_label_text = self.ui.skipped_label.text()
        self.solved_label_text = self.ui.solved_label.text()
        self.mistakes_label_text = self.ui.mistakes_label.text()

        self.a = randint(10, 99)
        self.b = randint(10, 99)
        self.sign = "+"
        self.var = 10
        
        self.ui.combo_box.currentTextChanged.connect(self.on_combobox_select)
        self.ui.check_button.clicked.connect(self.check_button_click)
        self.ui.skip_button.clicked.connect(self.skip_button_click)

        self.ui.input_field.returnPressed.connect(self.check_button_click)

        self.reset_counters()

    def reset_counters(self):
        self.skipped = 0
        self.solved = 0
        self.mistakes = 0
        
        self.ui.example_label.setText(str(self.a) + self.sign + str(self.b) + "=")
        self.ui.skipped_label.setText(f"{self.skipped_label_text} {self.skipped}")
        self.ui.solved_label.setText(f"{self.solved_label_text} {self.solved}")
        self.ui.mistakes_label.setText(f"{self.mistakes_label_text} {self.mistakes}")

    def on_combobox_select(self, text):
        if text == "Addition within 100":
            self.sign = "+"
            self.var = 1
        else:
            self.sign = "*"
            self.var = 10

        self.a = int(randint(10, 99)/self.var)
        self.b = int(randint(10, 99)/self.var)
            
        self.reset_counters()
        
    def check_button_click(self):
        if self.sign == "+":
            correct_answer = self.a + self.b
        else:
            correct_answer = self.a * self.b
            
        if self.ui.input_field.text() == str(correct_answer):
            audio_url = QUrl.fromLocalFile("bell.wav")
            self.player.setSource(audio_url)
            self.player.play()
            
            self.setCurrentIndex(1) # Show result page
            QTimer.singleShot(1000, lambda: self.setCurrentIndex(0)) # Go back
            self.solved = self.solved + 1
            self.ui.solved_label.setText(f"{self.solved_label_text} {self.solved}")
            self.next_example()
        elif self.ui.input_field.text() == "":
            pass
        else:
            audio_url = QUrl.fromLocalFile("losetrumpet.wav")
            self.player.setSource(audio_url)
            self.player.play()
            
            self.setCurrentIndex(2) # Show result page
            QTimer.singleShot(1000, lambda: self.setCurrentIndex(0)) # Go back
            self.mistakes = self.mistakes + 1
            self.ui.mistakes_label.setText(f"{self.mistakes_label_text} {self.mistakes}")
            self.next_example()

    def skip_button_click(self):
        self.skipped += 1
        self.ui.skipped_label.setText(f"{self.skipped_label_text} {self.skipped}")
        self.next_example()

    def next_example(self):
        self.a = int(randint(10, 99)/self.var)
        self.b = int(randint(10, 99)/self.var)
            
        self.ui.example_label.setText(str(self.a) + self.sign + str(self.b) + "=")
        self.ui.input_field.setText("")
        
if __name__ == "__main__":
    app = QApplication([])

    # Translate app
    locale = QLocale.system().name()
    translator = QTranslator()
    if translator.load(f"ui_{locale}.qm"):
        app.installTranslator(translator)
        
    application = MathTrainer()
    application.show()
    sys.exit(app.exec())
