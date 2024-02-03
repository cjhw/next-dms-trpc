"use client";

import { useAntdForm } from "@/libs/form";
import { Form, Input } from "antd";
import { login } from "./actions";

interface LoginT {
  account: string;
  password: string;
}

export const LoginForm = () => {
  const { formProps, formItemProps, SubmitBtn } = useAntdForm<LoginT>({
    formProps: {},
    formItemProps: {
      account: {
        name: "account",
        label: "帳號",
        rules: [{ required: true }],
      },
      password: {
        name: "password",
        label: "密碼",
        rules: [{ required: true }],
      },
    },
    formAction: login,
  });

  return (
    <Form {...formProps}>
      <Form.Item {...formItemProps.account}>
        <Input autoFocus />
      </Form.Item>
      <Form.Item {...formItemProps.password}>
        <Input.Password />
      </Form.Item>
      <SubmitBtn>登入</SubmitBtn>
    </Form>
  );
};
