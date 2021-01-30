import React from "react";

import uploadImage from "../utils/uploadImage";

const classes = {
  container: "w-full max-w-lg",
  label: "text-sm block font-bold flex items-center",
  input:
    "col-span-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300",
  form: "px-0 mt-16",
  div: "px-0 pb-6 grid grid-cols-3 gap-4 ",
};

const FileUploader = ({ handleFile, photo, id }) => {
  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  function handleChange(event) {
    const fileUploaded = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      handleFile(e.target.result);
    };
    reader.readAsDataURL(fileUploaded);
  }

  return photo ? (
    <div>
      <img src={photo} alt="preview" />
      <button
        type="button"
        className="bg-red-500 w-full mt-1 text-gray-200 rounded hover:bg-red-400 px-4 py-1 focus:outline-none"
        onClick={() => handleFile(null)}
      >
        Remove
      </button>
    </div>
  ) : (
    <>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleClick}
      >
        Choose photo
      </button>
      <input
        id={id}
        required
        className="hidden"
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        accept="image/*"
      />
    </>
  );
};

function Form({ formTitle, onSave, dish, loading, error }) {
  const [type, setType] = React.useState(dish?.type || "side");
  const [name, setName] = React.useState(dish?.name);
  const [price, setPrice] = React.useState(dish?.price);
  const [photo, setPhoto] = React.useState(dish?.photo);

  function onSubmit(event) {
    event.preventDefault();
    dish?.photo !== photo
      ? uploadImage(photo).then((secure_url) => {
          onSave({ type, name, price, photo: secure_url });
        })
      : onSave({ type, name, price, photo });
  }

  return (
    <div className={classes.container}>
      <h2 className="text-gray-600 font-medium text-lg">{formTitle}</h2>
      <form onSubmit={onSubmit} className={classes.form}>
        <div className={classes.div}>
          <label htmlFor="type" className={classes.label}>
            Type
          </label>
          <select
            id="type"
            required
            className={classes.input}
            defaultValue={type}
            onChange={(event) => setType(event.target.value)}
          >
            <option value="side">Side</option>
            <option value="main-course">Main Course</option>
          </select>
        </div>
        <div className={classes.div}>
          <label htmlFor="name" className={classes.label}>
            Name
          </label>
          <input
            required
            name="name"
            id="name"
            className={classes.input}
            placeholder="Enter the name"
            defaultValue={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className={classes.div}>
          <label htmlFor="price" className={classes.label}>
            Price
          </label>
          <input
            required
            name="price"
            id="price"
            type="number"
            className={classes.input}
            placeholder="Enter the price"
            defaultValue={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>
        <div className={classes.div}>
          <label htmlFor="photo" className={classes.label}>
            Photo
          </label>
          <FileUploader id="photo" handleFile={setPhoto} photo={photo} />
        </div>

        <div>
          {loading ? (
            <button
              type="button"
              className="inline-flex items-center py-2 mt-10 px-4 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-pink-600 hover:bg-pink-500 focus:border-pink-700 active:bg-pink-700 transition ease-in-out duration-150 cursor-not-allowed"
              disabled
            >
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-10 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save Item
            </button>
          )}
        </div>
        {error && <p className="font-bold text-red-500">{error.message}</p>}
      </form>
    </div>
  );
}

export default Form;
