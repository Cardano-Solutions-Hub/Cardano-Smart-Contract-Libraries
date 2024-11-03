// eslint-disable-next-line react/prop-types
function ListboxWrapper({ children }) {
  return (
    <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
      {children}
    </div>
  );
}

export default ListboxWrapper;
