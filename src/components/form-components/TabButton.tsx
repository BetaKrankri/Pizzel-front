// TabButton.tsx
const TabButton: React.FC<{
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  isActive?: boolean;
}> = ({ label, onClick, isActive }) => {
  return (
    <button
      className={`TabButton px-5 py-3 text-lg text-start rounded-sm min-w-[180px] transition-all
       hover:bg-slate-900 ${isActive && "bg-slate-800 hover:bg-slate-800"}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
export default TabButton;
