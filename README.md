# Math trainer  
![Static Badge](https://img.shields.io/badge/Python-3.x-blue)
![Static Badge](https://img.shields.io/badge/License-GPL_v3-blue)
![Static Badge](https://img.shields.io/badge/PyQt-6-green)
![Static Badge](https://img.shields.io/badge/Made_with-Qt_Designer-green)
![Static Badge](https://img.shields.io/badge/Translated_with-Qt_Linguist-green)
[![Ruff](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/astral-sh/ruff/main/assets/badge/v2.json)](https://github.com/astral-sh/ruff)

A math trainer for kids written in Python and PyQt 6. It includes addition within 100 and multiplication within 10.

![Math trainer running on KDE Plasma 5.27 desktop](https://raw.githubusercontent.com/limafresh/MathTrainer/main/screenshot.png)

## Installation
### From PyPi via pip
```
pip install math-trainer
```
### From source
#### Via pip
```
git clone https://github.com/limafresh/MathTrainer.git
```
```
cd MathTrainer
```
```
pip install .
```
#### Easy to run without installation
Just run *main.py* via Python.

## Usage
```
math-trainer
```

## How to use  
The application generates an example with random numbers. You need to enter the correct answer to it and click the "CHECK" button.

## Additional information
`math_trainer`:
+ `main.py`: contains the application logic
+ `ui.ui`: contains the application interface, created in Qt Designer
+ `locales`:
    + `*.ts`: translation files created in Qt Linguist
    + `*.qm`: contain translation, created as a result of conversion from *.ts* by the *lrelease* utility
+ `sounds`: contain sounds of correct and wrong answers

`pyproject.toml`: contains information needed for installation via pip

Sound effects authors: *Fupy*, *0new4y*; from [OpenGameArt.org](https://opengameart.org/), sounds licensed under CC0.
