# Math trainer  
![Static Badge](https://img.shields.io/badge/Python-3.x-blue)
![Static Badge](https://img.shields.io/badge/License-GPL_v3-blue)
![Static Badge](https://img.shields.io/badge/PyQt-6-green)
![Static Badge](https://img.shields.io/badge/Made_with-Qt_Designer-green)
![Static Badge](https://img.shields.io/badge/Translated_with-Qt_Linguist-green)
[![Ruff](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/astral-sh/ruff/main/assets/badge/v2.json)](https://github.com/astral-sh/ruff)

A math trainer for kids written in Python and PyQt 6. It includes addition within 100 and multiplication within 10.

![screenshot](https://raw.githubusercontent.com/limafresh/MathTrainer/main/screenshot.png)

## Installation

### Windows 64bit

[Download portable .exe file](https://github.com/limafresh/MathTrainer/releases)

[*How is it packaged?*](https://gist.github.com/limafresh/21b8b7dd22ee456f61e400a96aeab5f1)

### Linux

#### From .deb file (Debian/Ubuntu/Linux Mint)
[Download .deb file](https://github.com/limafresh/MathTrainer/releases)

| Release filename | Build system | Compatible distributions |
| ---------------- | ------------ | ------------------------------------- |
| `math-trainer_<version>-noble_all.deb` | Ubuntu Noble | Ubuntu Noble (24.04), Debian bookworm (12), Linux Mint 22, others based on Ubuntu 24.04 or Debian 12 |

#### From PPA (Ubuntu based distributions, 24.04 and newer)
```bash
sudo add-apt-repository ppa:limafresh/math-trainer
sudo apt update
sudo apt install math-trainer
```
### Run via Python (without installation)
Just run *math_trainer/main.py* via Python.

## How to use  
The application generates an example with random numbers. You need to enter the correct answer to it and click the "CHECK" button.

## Additional information
`translations`: translation files created in Qt Linguist

`math_trainer`:
+ `main.py`: contains the application logic
+ `ui.ui`: contains the application interface, created in Qt Designer
+ `locales`: contain translation, created as a result of conversion from *.ts* by the *lrelease* utility
+ `sounds`: contain sounds of correct and wrong answers

## Credits
Sound effects authors: *Fupy*, *0new4y*, under CC0; wood texture is by *SpringySpringo*, under CC0. From [OpenGameArt.org](https://opengameart.org/).
