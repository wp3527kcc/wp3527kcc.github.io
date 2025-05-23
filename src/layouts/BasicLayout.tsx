// import { useState, useCallback } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Button, Space } from "antd";

export default function () {
  const navigate = useNavigate();

  return (
    <div>
      <Space>
        <Button
          onClick={() => {
            navigate("/home");
          }}
          type="link"
        >
          go Home
        </Button>
        <Button
          onClick={() => {
            navigate("/");
          }}
          type="link"
        >
          go Root
        </Button>
      </Space>
      <Outlet />
    </div>
  );
}
