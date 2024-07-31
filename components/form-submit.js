"use client";
//useFormStatus requires a client component

import { useFormStatus } from "react-dom";

export default function FormSubmit() {
  //this component which uses useFormStatus hook must be imported and used between form tags to work
  const status = useFormStatus();

  if (status.pending) {
    return <p>Creating post...</p>;
  }

  return (
    <>
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </>
  );
}
