import { memo } from "react"

interface ControlMenuProps {
  value: string
  onChange: React.Dispatch<React.SetStateAction<string>>
  sortOptionList: { value: string; name: string }[]
}

function ControlMenu({ value, onChange, sortOptionList }: ControlMenuProps) {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {sortOptionList.map((option, idx) => (
        <option key={idx} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  )
}

export default memo(ControlMenu)
