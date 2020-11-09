# !/urs/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка приложения
npm run build

# переход в каталог сборки
cd dist

# инициализация репозитория и загрузка кода в GitHub
git init
git add -A
git commit -m 'Deploy'

git push -f https://github.com/tidalinn/vue-techzavr-deploy.git master:gh-pages

cd -