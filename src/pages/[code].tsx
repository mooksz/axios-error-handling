import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { callService } from "@/services/service";
import { useStoreDispatch } from "@/hooks/useStoreDispatch";
import { useStoreSelector } from "@/hooks/useStoreSelector";
import { testApi, testSelector } from "@/store/testSlice";

export default function Code() {
  const { isReady, query } = useRouter();

  /** Local state */
  const [localMessage, setLocalMessage] = useState("");
  const [localErrors, setLocalErrors] = useState<string[]>([]);

  /** Redux */
  const {
    message: storeMessage,
    loading: storeLoading,
    errors: storeErrors,
  } = useStoreSelector(testSelector);
  const dispatch = useStoreDispatch();

  /** Local */
  useEffect(() => {
    if (!isReady) return;

    /** Controller */
    const controller = new AbortController();
    const { signal } = controller;

    async function getData() {
      /** Reset data */
      setLocalErrors([]);
      setLocalMessage("");

      const { code } = query;

      if (!code) return;

      // const {canceled, errors, data} = await callService(
      const response = await callService(
        code instanceof Array ? code[0] : code,
        signal
      );

      if (response.canceled) return;

      if (response.errors) {
        setLocalErrors(response.errors);
        return;
      }

      setLocalMessage(response.data.message);
    }

    getData();

    return () => {
      controller.abort();
    };
  }, [isReady, query]);

  /** Redux */
  useEffect(() => {
    if (!isReady) return;

    const { code } = query;

    if (!code) return;

    const controller = dispatch(
      testApi(code instanceof Array ? code[0] : code)
    );

    return () => {
      controller.abort();
    };
  }, [isReady, query]);

  return (
    <main style={{ height: "100vh" }}>
      <div>
        <h3>Local state</h3>
        <p>{localMessage || localErrors[0]}</p>
      </div>

      <div>
        <h3>Redux</h3>

        <p>{storeLoading ? "Laden" : storeMessage || storeErrors[0]}</p>
      </div>
    </main>
  );
}
