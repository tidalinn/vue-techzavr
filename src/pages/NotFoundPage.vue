<template>
  <div class="notfound__page">
    <h1 class="notfound__header">Страница не найдена</h1>
    <div class="notfound__description">
        <p>Запрашиваемая страница не найдена или не существует.</p>
        <p>Вернуться на 
          <router-link class="notfound__link" :to="{name: 'main'}">главную</router-link>
        </p>
    </div>
  </div>
</template>

<script>
import '@/assets/css/notfoundpage.css';

export default {
};
</script>