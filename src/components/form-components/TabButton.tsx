// TabButton.tsx
const TabButton: React.FC<{
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  isActive?: boolean;
}> = ({ label, onClick, isActive }) => {
  const activeStyle = isActive ? { backgroundColor: "#1E293B" } : {};
  return (
    <button
      className={`TabButton px-8 py-3 sm:px-5 sm:py-3 rounded-sm sm:w-full text-center sm:text-start text-xl sm:text-lg transition-all duration-100
      bg-slate-950 hover:bg-slate-900 whitespace-nowrap`}
      style={activeStyle}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
export default TabButton;
