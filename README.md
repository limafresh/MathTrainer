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
### From .deb file (Debian/Ubuntu/Linux Mint)
[Download .deb file](https://launchpad.net/~limafresh/+archive/ubuntu/math-trainer/+packages)

| Release filename | Build system | Compatible distributions |
| ---------------- | ------------ | ------------------------------------- |
| `math-trainer_<version>-noble_all.deb` | Ubuntu Noble | Ubuntu Noble (24.04), Debian bookworm (12), Linux Mint 22, others based on Ubuntu 24.04 or Debian 12 |
| `math-trainer_<version>-oracular_all.deb` | Ubuntu Oracular | Ubuntu Oracular (24.10) |
### From PPA (Ubuntu based distributions, 24.04 and newer)
```bash
sudo add-apt-repository ppa:limafresh/math-trainer
sudo apt update
sudo apt install math-trainer
```
### From PyPi via pip
```bash
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
```bash
math-trainer
```
Or run it from the applications menu (it doesn't work from PyPi).

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

## Credits
Sound effects authors: *Fupy*, *0new4y*, under CC0; wood texture is by *SpringySpringo*, under CC0. From [OpenGameArt.org](https://opengameart.org/).

## Notes
### 05.11.2024
New release numbering: X.X.X.postX (Major, minor, patch, README update or something not related to code).
