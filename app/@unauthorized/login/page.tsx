import { Card, Col, Row } from "antd";
import { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "登入 - Next DMS tRPC",
};

export default function Page() {
  return (
    <Row className="h-svh bg-primary" justify="center" align="middle">
      <Col>
        <Card className="animate-fade-in-up" title="登入">
          <LoginForm />
        </Card>
      </Col>
    </Row>
  );
}
