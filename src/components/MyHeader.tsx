interface MyHeaderProps {
  headText?: string
  leftChild?: React.ReactNode
  rightChild?: React.ReactNode
}

function MyHeader({ headText, leftChild, rightChild }: MyHeaderProps) {
  return (
    <header>
      <div className="head_btn_left">{leftChild}</div>
      <div className="head_text">{headText}</div>
      <div className="head_btn_right">{rightChild}</div>
    </header>
  )
}

export default MyHeader
