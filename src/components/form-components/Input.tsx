const Input = () => {
  return (
    <div>
      <label className={` flex flex-col gap-2`}>
        <p>Label</p>
        <input
          type="number"
          name=""
          className={`gap rounded-md px-4 py-2 bg-stone-700 ring-stone-600 active:ring-stone-800 `}
        />
      </label>
    </div>
  );
};

export default Input;
