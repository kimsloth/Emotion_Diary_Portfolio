import { memo } from "react"
import { Emotion } from "../types"

interface EmotionItemProps {
  emotion: Emotion
  isSelected: boolean
  onClick: (emotion_id: number) => void
}

function EmotionItem({
  emotion: { emotion_id, emotion_descrpit, emotion_img },
  isSelected,
  onClick,
}: EmotionItemProps) {
  return (
    <div
      className={[
        "EmotionItem",
        isSelected ? `EmotionItem_on_${emotion_id}` : "EmotionItem_off",
      ].join(" ")}
      onClick={() => onClick(emotion_id)}
    >
      <img src={emotion_img} alt={`감정 ${emotion_descrpit} 이미지`} />
      <span>{emotion_descrpit}</span>
    </div>
  )
}

export default memo(EmotionItem)
