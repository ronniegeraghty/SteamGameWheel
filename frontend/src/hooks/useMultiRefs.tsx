import { useRef } from "react";

export function useMultiRefs(amount: number) {
  let refsArr = [];
  for (let i = 0; i < amount; i++) {
    const ref = useRef();
    refsArr.push();
  }
}
