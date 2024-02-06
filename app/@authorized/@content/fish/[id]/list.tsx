"use client";

import { LeftOutlined } from "@ant-design/icons";
import type { Fish } from "@prisma/client";
import { Breadcrumb, Button, Card, Descriptions, Space } from "antd";
import dayjs from "dayjs";
import Link from "next/link";

interface Props {
  item?: Fish;
}

export const List = ({ item }: Props) => {
  return (
    <Card>
      <Space direction="vertical" size="large">
        <Space>
          <Link href="/fish">
            <Button type="text" icon={<LeftOutlined />}>
              返回
            </Button>
          </Link>
          <Breadcrumb
            items={[
              { title: <Link href="/fish">fish 管理</Link> },
              { title: item?.name },
            ]}
          />
        </Space>
        <Descriptions bordered>
          <Descriptions.Item label="名稱">{item?.name}</Descriptions.Item>
          <Descriptions.Item label="欄位1">{item?.col1}</Descriptions.Item>
          <Descriptions.Item label="欄位2">{item?.col2}</Descriptions.Item>
          <Descriptions.Item label="欄位3">{item?.col3}</Descriptions.Item>
          <Descriptions.Item label="欄位4">{item?.col4}</Descriptions.Item>
          <Descriptions.Item label="欄位5">{item?.col5}</Descriptions.Item>
          <Descriptions.Item label="建立時間">
            {dayjs(item?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
          </Descriptions.Item>
          <Descriptions.Item label="更新時間">
            {dayjs(item?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
          </Descriptions.Item>
        </Descriptions>
      </Space>
    </Card>
  );
};
