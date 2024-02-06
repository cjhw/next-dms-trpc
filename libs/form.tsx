import { DEFAULT_PUBLIC_ROUTE } from "@/constants/route";
import {
  Button,
  ButtonProps,
  Form,
  FormItemProps,
  FormProps,
  message,
  type FormInstance,
} from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

interface FormActionT<T> {
  data?: T;
  status?: number;
  message?: string;
}

type FormItemPropsT<T> = FormItemProps<T> & {
  name: T;
  label: string;
  rules: [{ required: boolean }];
};

interface UseAntdFormT<T, D> {
  formProps: FormProps<T>;
  formItemProps: { [k in keyof T]: FormItemPropsT<k> };
  formAction: (
    prevState: unknown,
    formData: FormData,
  ) => Promise<FormActionT<D>>;
}

interface UseAntdFormRT<T, D> {
  formInstance: FormInstance<T>;
  formProps: FormProps<T>;
  formItemProps: { [k in keyof T]: FormItemPropsT<k> };
  SubmitBtn: (props: ButtonProps) => JSX.Element;
  data?: D;
  isLoading: boolean;
}

export const useAntdForm = <T extends object, D = undefined>({
  formProps,
  formItemProps,
  formAction,
}: UseAntdFormT<T, D>): UseAntdFormRT<T, D> => {
  const router = useRouter();
  const pathname = usePathname();
  const [formInstance] = Form.useForm<T>();
  const [state, action] = useFormState(formAction, { message: "" });
  const { pending } = useFormStatus();
  const [msg, msgContext] = message.useMessage();

  useEffect(() => {
    if (state.message) {
      msg.info(state.message);
    }
    if (state.status === 401 && pathname !== DEFAULT_PUBLIC_ROUTE) {
      setTimeout(() => {
        router.refresh();
      }, 4500);
    }
  }, [msg, state]);

  const SubmitBtn = (props: ButtonProps) => {
    return (
      <>
        {msgContext}
        <Button
          type="primary"
          htmlType="submit"
          disabled={pending}
          {...props}
        />
      </>
    );
  };

  return {
    formProps: {
      form: formInstance,
      layout: "vertical",
      onFinish: (values) => {
        const formData = new FormData();
        Object.entries(values).forEach(([k, v]) => {
          if (v) {
            formData.append(k, v);
          }
        });
        action(formData);
      },
      ...formProps,
    },
    formInstance,
    formItemProps,
    SubmitBtn,
    data: state.data,
    isLoading: pending,
  };
};
