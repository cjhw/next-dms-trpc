"use client";

import { useAntdForm } from "@/libs/form";
import type { Fish } from "@prisma/client";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Table,
  type TableProps,
} from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useEffect } from "react";
import { getList } from "./actions";

interface FishSearchParamsT {
  name: string;
  col1: string;
  period: [Dayjs, Dayjs];
  start: string;
  end: string;
}

type RowT = Pick<Fish, "id" | "name" | "col1" | "createdAt">;

export const SearchForm = () => {
  const { formInstance, formProps, formItemProps, SubmitBtn, data, isLoading } =
    useAntdForm<FishSearchParamsT, RowT[]>({
      formProps: {
        layout: "inline",
      },
      formItemProps: {
        name: {
          name: "name",
          label: "名稱",
          rules: [{ required: false }],
        },
        col1: {
          name: "col1",
          label: "欄位1",
          rules: [{ required: false }],
        },
        period: {
          name: "period",
          label: "建立時間",
          rules: [{ required: false }],
        },
        start: {
          name: "start",
          label: "",
          rules: [{ required: false }],
        },
        end: {
          name: "end",
          label: "",
          rules: [{ required: false }],
        },
      },
      formAction: getList,
    });

  const start = Form.useWatch("start", formInstance);
  const end = Form.useWatch("end", formInstance);

  const tableProps: TableProps<RowT> = {
    rowKey: "id",
    columns: [
      {
        title: "名稱",
        dataIndex: "name",
      },
      {
        title: "欄位1",
        dataIndex: "col1",
      },
      {
        title: "建立時間",
        dataIndex: "createdAt",
        render: (_, record) =>
          dayjs(record.createdAt).format("YYYY-MM-DD HH:mm:ss"),
      },
    ],
    dataSource: data,
    loading: isLoading,
  };

  useEffect(() => {
    formInstance.submit();
  }, []);

  return (
    <div className="flex flex-col w-full gap-3">
      <Card>
        <Form {...formProps}>
          <Form.Item {...formItemProps.name}>
            <Input />
          </Form.Item>
          <Form.Item {...formItemProps.col1}>
            <Input />
          </Form.Item>
          <Form.Item {...formItemProps.period}>
            <DatePicker.RangePicker
              value={[dayjs(start), dayjs(end)]}
              onChange={(values) => {
                formInstance.setFieldValue("start", values?.[0]?.toISOString());
                formInstance.setFieldValue("end", values?.[1]?.toISOString());
              }}
            />
          </Form.Item>
          <Form.Item {...formItemProps.start} className="hidden">
            <Input />
          </Form.Item>
          <Form.Item {...formItemProps.end} className="hidden">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button
              onClick={() => {
                formInstance.resetFields();
                formInstance.submit();
              }}
            >
              重置
            </Button>
          </Form.Item>
          <SubmitBtn>搜尋</SubmitBtn>
        </Form>
      </Card>
      <Card>
        <Table {...tableProps} />
      </Card>
    </div>
  );
};
