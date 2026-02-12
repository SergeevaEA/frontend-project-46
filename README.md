### Github Actions:
[![Node CI](https://github.com/SergeevaEA/frontend-project-46/actions/workflows/main.yml/badge.svg)](https://github.com/SergeevaEA/frontend-project-46/actions/workflows/main.yml)

# Difference calculator

Консольная утилита, которая сравнивает данные YAML и JSON форматов и выводит разницу между ними.

## Технологический стек

JavaScript, ESLint, Jest, lodash, js-yaml, commander

## Выполненные задачи

* реализовала вывод справочной информации о программе
* реализовала поиск различий между данными из двух файлов (плоские и вложенные структуры данных, поддерживаются форматы yaml, json)
* реализовала несколько форматов вывода результатов сравнения

## Демонстрация работы проекта

1) Нахождение различий между двумя JSON файлами (плоские структуры): 

[![asciicast](https://asciinema.org/a/Xds6AI2pQWIdV6TG1xXzWWlOU.svg)](https://asciinema.org/a/Xds6AI2pQWIdV6TG1xXzWWlOU)

2) Нахождение различий между двумя YML файлами (плоские структуры): 

[![asciicast](https://asciinema.org/a/yrFYyWkXEOXyOsJjtRBfncGVn.svg)](https://asciinema.org/a/yrFYyWkXEOXyOsJjtRBfncGVn)

3) Нахождение различий между JSON и YML файлами (вложенные структуры) с использованием форматтера stylish.

[![asciicast](https://asciinema.org/a/5lQ4XJDml5bTYKWN6L818WVVD.svg)](https://asciinema.org/a/5lQ4XJDml5bTYKWN6L818WVVD)

4) Нахождение различий между JSON и YML файлами (вложенные структуры) с использованием форматтера plain.

[![asciicast](https://asciinema.org/a/6SBr4MlYlnacc8oCIlv1CcKHe.svg)](https://asciinema.org/a/6SBr4MlYlnacc8oCIlv1CcKHe)

5) Нахождение различий между JSON и YML файлами (вложенные структуры) с использованием форматтера json.

[![asciicast](https://asciinema.org/a/X4fiGpZsMKMEjU1XBgTD3dVm6.svg)](https://asciinema.org/a/X4fiGpZsMKMEjU1XBgTD3dVm6)

## Установка

Клонировать репозиторий:

```bash
git clone https://github.com/SergeevaEA/frontend-project-46.git
cd frontend-project-46
```

Установить зависимости:

```bash
make install
```

Запуск тестов

```bash
make test
```

## Команды для работы с программой:

* Команда для вывода справочной информации о программе: gendiff -h
* Команда для нахождения различий между двумя файлами: gendiff file1.json file2.yml
* Нахождение различий между файлами с использованием форматтера stylish: gendiff -f stylish file1.json file2.yml
* Нахождение различий между файлами с использованием форматтера plain: gendiff -f plain file1.json file2.yml
* Нахождение различий между файлами с использованием форматтера json: gendiff -f json file1.json file2.yml