import { useRef, useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import { toast } from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";
import { Loader2 } from "lucide-react";
import ImageUpload from "../components/ImageUpload";

const Add = () => {
  const [isLoading, setIsLoading] = useState(false);

  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const image3Ref = useRef(null);
  const image4Ref = useRef(null);

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size],
    );
  };

  const removeImage1 = () => {
    setImage1(null);
    image1Ref.current.value = "";
  };

  const removeImage2 = () => {
    setImage2(null);
    image2Ref.current.value = "";
  };

  const removeImage3 = () => {
    setImage3(null);
    image3Ref.current.value = "";
  };

  const removeImage4 = () => {
    setImage4(null);
    image4Ref.current.value = "";
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setCategory("Men");
    setSubCategory("Topwear");
    setPrice("");
    setBestseller(false);
    setSizes([]);

    setImage1(null);
    setImage2(null);
    setImage3(null);
    setImage4(null);

    image1Ref.current.value = "";
    image2Ref.current.value = "";
    image3Ref.current.value = "";
    image4Ref.current.value = "";
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const formData = new FormData();
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      const res = await axiosInstance.post("/admin/add", formData);

      resetForm();
      toast.success("Product added successfully");
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Unknown error";

      console.log("Error in addProduct:", message);

      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>

        <div className="flex gap-2">
          <ImageUpload
            image={image1}
            setImage={setImage1}
            inputRef={image1Ref}
            id="image1"
          />

          <ImageUpload
            image={image2}
            setImage={setImage2}
            inputRef={image2Ref}
            id="image2"
          />

          <ImageUpload
            image={image3}
            setImage={setImage3}
            inputRef={image3Ref}
            id="image3"
          />

          <ImageUpload
            image={image4}
            setImage={setImage4}
            inputRef={image4Ref}
            id="image4"
          />
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name *</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-125 py-2 px-3"
          type="text"
          placeholder="Type here"
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description *</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full max-w-125 py-2 px-3"
          type=""
          placeholder="Write content here"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category *</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub category *</p>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product price *</p>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 sm:w-30"
            type="number"
            placeholder="25"
            min={1}
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product sizes *</p>
        <div
          className="flex gap-3"
          onClick={(e) => toggleSize(e.target.innerText)}
        >
          <div>
            <p
              className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}
            >
              S
            </p>
          </div>
          <div>
            <p
              className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}
            >
              M
            </p>
          </div>
          <div>
            <p
              className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}
            >
              L
            </p>
          </div>
          <div>
            <p
              className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}
            >
              XL
            </p>
          </div>
          <div>
            <p
              className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          checked={bestseller}
          onChange={(e) => {
            setBestseller(e.target.checked);
          }}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      <button className="w-28 py-3 mt-4 bg-black text-white">
        {isLoading ? <Loader2 className="animate-spin mx-auto" /> : "ADD"}
      </button>
    </form>
  );
};
export default Add;
