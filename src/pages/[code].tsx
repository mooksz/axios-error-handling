import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { callService } from "@/services/service";

export default function Code() {
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const { isReady, query } = useRouter();

  useEffect(() => {
    if (!isReady) return;

    /** Controller */
    const controller = new AbortController();
    const { signal } = controller;

    async function getData() {
      /** Reset data */
      setErrors([]);
      setMessage("");

      const { code } = query;

      if (!code) return;

      // const {canceled, errors, data} = await callService(
      const response = await callService(
        code instanceof Array ? code[0] : code,
        signal
      );

      if (response.canceled) return;

      if (response.errors) {
        setErrors(response.errors);
        return;
      }

      setMessage(response.data.message);
    }

    getData();

    return () => {
      controller.abort();
    };
  }, [isReady, query]);

  return <main style={{ height: "100vh" }}>{message || errors[0]}</main>;
}
