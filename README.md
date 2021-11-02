# Задание - поиск изображений

Напиши небольшое приложение поиска и просмотра изображений по ключевому слову

# Инструкции Pixabay API

Для HTTP-запросов используй публичный Pixabay API. Зарегистрируйся и получи ключ.

URL-строка запроса:

https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ
Pixabay API поддерживает пагинацию, пусть в ответе приходит по 12 объектов, установлено в параметре
per_page. По умолчанию параметр page равен 1. При каждом последующем запросе page увеличивается на
1, а при поиске по новому ключевому слову необходимо сбрасывать его значение в 1.
