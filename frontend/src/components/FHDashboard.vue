<template>

  <h1>Das ist das vorläufige Dashboard</h1>

  <button @click="onClickButton">TestButton</button>
<br>
  <router-link to="/">Link zum Anfang</router-link>
</template>


<script setup lang="ts">
import {executeRequest} from "@/../globals/httpClient.ts";

async function onClickButton(): Promise<void> {
  await executeRequest(new URL('http://localhost:8088/api/ping'))

}

</script>


<style lang="scss"></style>
