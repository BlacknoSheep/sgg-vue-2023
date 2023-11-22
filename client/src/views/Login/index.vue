<template>
  <div class="wrapper">
    <el-card class="login-card">
      <h1 class="title">后台管理系统</h1>
      <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="rules" class="loginForm">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" :prefix-icon="User" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" autocomplete="off" :prefix-icon="Lock" show-password />
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" @click="submitForm(loginFormRef as any)">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { User, Lock } from "@element-plus/icons-vue";
import { apiLogin } from "@/utils/api.ts";

// 表单实例
const loginFormRef = ref<FormInstance>();
// 表单项
const loginForm = reactive({
  username: "admin",
  password: "admin",
});
// 表单验证规则
const rules = reactive<FormRules<typeof loginForm>>({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 5, max: 20, message: "长度在 5 到 20 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 5, max: 20, message: "长度在 5 到 20 个字符", trigger: "blur" },
  ],
});

// 提交
function submitForm(formEL: FormInstance) {
  if (!formEL) return;
  formEL.validate((valid) => {
    if (valid) {
      console.log("submit!");
      apiLogin(loginForm.username, loginForm.password).then((res) => {
        console.log(res);
      });
    } else {
      console.log("error submit!!");
      return false;
    }
  });
}
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-card {
    width: 400px;
    height: 300px;
    display: flex;
    flex-direction: column;

    .title {
      text-align: center;
      font-size: 30px;
      margin-bottom: 20px;
    }
  }
}
</style>
