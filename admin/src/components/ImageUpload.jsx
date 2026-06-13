import { X } from "lucide-react";
import { assets } from "../assets/admin_assets/assets";

const ImageUpload = ({ image, setImage, inputRef, id }) => {
  const removeImage = () => {
    setImage(null);
    inputRef.current.value = "";
  };

  return (
    <div className="relative">
      {!image ? (
        <label htmlFor={id}>
          <img
            src={assets.upload_area}
            alt=""
            className="w-20 aspect-square object-cover cursor-pointer"
          />
        </label>
      ) : (
        <img
          src={URL.createObjectURL(image)}
          alt=""
          className="w-20 aspect-square object-cover"
        />
      )}

      {image && (
        <button
          type="button"
          onClick={removeImage}
          className="absolute top-1 right-1 bg-black/70 hover:bg-black text-white rounded-full p-1"
        >
          <X size={12} />
        </button>
      )}

      <input
        ref={inputRef}
        id={id}
        type="file"
        hidden
        onChange={(e) => setImage(e.target.files[0])}
      />
    </div>
  );
};

export default ImageUpload;
