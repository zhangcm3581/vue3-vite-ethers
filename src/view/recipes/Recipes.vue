<template>
    <div class="divide-y divide-gray-100">
    <Nav>
      <NavItem href="/featured" :isActive="true">Featured</NavItem>
      <NavItem href="/popular">Popular</NavItem>
      <NavItem href="/recent">Recent</NavItem>
    </Nav>
    <List>
      <ListItem v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </List>
  </div>
  <div ref="lottie1" class="lottie"></div>
</template>

<script setup lang='ts'>
import Nav from './components/Nav.vue'
import NavItem from './components/NavItem.vue';
import List from './components/List.vue';
import ListItem from './components/ListItem.vue';
import lottie from 'lottie-web'
import { ref, onMounted } from 'vue'

const recipes = ref([
  {
    id: 0,
    title: 'Hank’s Juiciest Beef Burger',
    time: 30,
    difficulty: 'Easy',
    servings: 4,
    rating: 4.95,
    author: 'Hank Douglas'
  },
  {
    id: 1,
    title: 'Southern Fried Chicken Sandwich',
    time: 30,
    difficulty: 'Easy',
    servings: 4,
    rating: 4.95,
    author: 'Nicholas Denver'
  },
  {
    id: 2,
    title: 'Lily’s Healthy Beef Burger',
    time: 30,
    difficulty: 'Intermediate',
    servings: 4,
    rating: 4.95,
    author: 'Lily Ford'
  }
])

const lottie1 = ref(null) //获取dom

onMounted(() => {
  lottie.loadAnimation({
  container: lottie1.value, // the dom element that will contain the animation
  renderer: 'canvas',
  loop: true,
  autoplay: true,
  path: 'Sunny.json' // the path to the animation json
});

})
</script>

<style scoped lang="scss">
.lottie {
  width: 300px;
  height: auto;
  text-align: left;
}
</style>
