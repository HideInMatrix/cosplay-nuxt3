<script setup lang="ts">
definePageMeta({
  layout: "single",
});
import type { FormError, FormSubmitEvent } from "#ui/types";

const state = reactive({
  email: undefined,
  password: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email) errors.push({ path: "email", message: "Required" });
  if (!state.password) errors.push({ path: "password", message: "Required" });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data);
}

let passwordType = ref("password");
const changePasswordType = () => {
  passwordType.value = "";
};
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <div class="mt-56 w-full max-w-md p-8 mx-auto">
      <h2 class="text-3xl font-bold">欢迎回来</h2>
      <p class="mt-2 text-sm text-gray-600">请登录您的账户</p>
      <UForm
        :validate="validate"
        :state="state"
        class="space-y-6 mt-6"
        @submit="onSubmit">
        <UFormGroup label="邮箱" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>

        <UFormGroup label="密码" name="password">
          <UInput v-model="state.password" :type="passwordType">
            <template #trailing>
              <UButton
                color="gray"
                variant="link"
                icon="i-heroicons-x-mark-20-solid"
                :padded="false"
                @click="changePasswordType" />
            </template>
          </UInput>
        </UFormGroup>

        <UButton type="submit" block color="black"> 登录 </UButton>
      </UForm>
      <div class="mt-6">
        <div class="mt-6 text-center text-sm">
          <span>还没有账户?</span>
          <!-- <NuxtLink to="/login" class="underline text-foreground transition">
            立即注册
          </NuxtLink> -->
        </div>
      </div>
    </div>
    <div
      class="hidden lg:block lg:w-1/2 m-12 bg-white shadow-lg rounded-xl"></div>
  </div>
</template>
