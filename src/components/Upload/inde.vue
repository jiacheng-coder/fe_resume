<template>
  <div>
    <input type="file" @change="uploadFile">
  </div>
</template>

<script setup lang="ts">
const uploadFile = (event: any) => {
  const file = event.target.files[0];
  console.log("file: ", file);
  // 在这里实现上传文件的逻辑
}
</script>
