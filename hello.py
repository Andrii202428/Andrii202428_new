import datetime
import os

# Получаем время
current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

print("--- ОТЧЕТ РОБОТА ---")
print(f"Привет, Andriiiiiii! Код запущен успешно.")
print(f"Время запуска на сервере: {current_time}")
print(f"Операционная система сервера: {os.name}")
print("--------------------")

