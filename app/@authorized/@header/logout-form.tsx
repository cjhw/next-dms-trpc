"use client";

import { useAntdForm } from "@/libs/form";
import { Form } from "antd";
import { logout } from "./actions";

export const LogoutForm = () => {
  const { formProps, SubmitBtn } = useAntdForm<{}>({
    formProps: {},
    formItemProps: {},
    formAction: logout,
  });
  return (
    <Form {...formProps}>
      <SubmitBtn type="text">登出</SubmitBtn>
    </Form>
  );
};
