import { CldUploadWidget } from "next-cloudinary";

export default function Upload() {
  return (
    <CldUploadWidget uploadPreset="rentiva_upload">
      {({ open }) => {
        return <button onClick={() => open()}>Upload Image</button>;
      }}
    </CldUploadWidget>
  );
}
