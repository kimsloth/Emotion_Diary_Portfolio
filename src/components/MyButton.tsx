enum ButtonType {
  default = "default",
  positive = "positive",
  negative = "negative",
}

interface MyButtonProps {
  text: string
  type?: keyof typeof ButtonType
  onClick: () => void
}

function MyButton({ text, type = "default", onClick }: MyButtonProps) {
  return (
    <button
      className={["MyButton", `MyButton_${type}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default MyButton
