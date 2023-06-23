// TabButton.tsx
const TabButton: React.FC<{
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  isActive?: boolean;
}> = ({ label, onClick, isActive }) => {
  const activeStyle = isActive ? { backgroundColor: "#1E293B" } : {};
  return (
    <button
      className={`TabButton px-5 py-3 rounded-sm min-w-[180px] text-start transition-all
      bg-slate-950 hover:bg-slate-900`}
      style={activeStyle}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
export default TabButton;
