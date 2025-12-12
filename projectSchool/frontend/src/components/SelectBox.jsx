export function SelectBox({ label, onChange, options }) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      
      <select 
        onChange={onChange}  // Pass onChange here
        className="w-full px-2 py-1 border border-gray-50 rounded-xs"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value || option.toLowerCase()}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}