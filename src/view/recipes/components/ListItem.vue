<template>
    <article class="p-2 mb-2 flex space-x-4 bg-amber-300">
    <img src="../../../assets/logo.png" alt="" class="flex-none w-18 h-18 rounded-lg object-cover" width="80" height="80" />
    <div class="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
      <h2 class="text-lg font-semibold text-black mb-0.5">
        {{ recipe.title }}
      </h2>
      <dl class="flex flex-wrap text-sm font-medium whitespace-pre">
        <div>
          <dt class="sr-only">Time</dt>
          <dd>
            <abbr :title="`${recipe.time} minutes`">{{ recipe.time }}m</abbr>
          </dd>
        </div>
        <div>
          <dt class="sr-only">Difficulty</dt>
          <dd> · {{ recipe.difficulty }}</dd>
        </div>
        <div>
          <dt class="sr-only">Servings</dt>
          <dd> · {{ recipe.servings }} servings</dd>
        </div>
        <div class="flex-none w-full mt-0.5 font-normal">
          <dt class="inline">By</dt>
          <dd class="inline text-black">&nbsp;{{ recipe.author }}</dd>
        </div>
        <div class="absolute top-0 right-0 rounded-full bg-amber-50 text-amber-900 px-2 py-0.5 hidden sm:flex lg:hidden xl:flex items-center space-x-1">
          <dt class="text-amber-500">
            <span class="sr-only">Rating</span>
            <svg width="16" height="20" fill="currentColor">
              <path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z" />
            </svg>
          </dt>
          <dd>{{ recipe.rating }}</dd>
        </div>
      </dl>
    </div>
  </article>
</template>

<script setup lang='ts'>
const props = defineProps<{
  recipe: any
}>()
</script>

<style scoped lang="scss">

</style>
