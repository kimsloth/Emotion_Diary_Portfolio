import { memo } from "react"
import { useNavigate } from "react-router-dom"
import { DiaryState } from "../types"
import MyButton from "./MyButton"

interface DiaryItemProps {
  diary: DiaryState
}

function DiaryItem({ diary: { id, emotion, content, date } }: DiaryItemProps) {
  const navigate = useNavigate()

  const strDate = new Date(date).toLocaleDateString()

  const goDetail = () => navigate(`/diary/${id}`)

  const goEdit = () => navigate(`/edit/${id}`)

  return (
    <div className="DiaryItem">
      <div
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img
          src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}
          alt={`감정 ${emotion}번 이미지`}
        />
      </div>
      <div className="info_wrapper" onClick={goDetail}>
        <div className="diary_date">{strDate}</div>
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton text="수정하기" onClick={goEdit} />
      </div>
    </div>
  )
}

export default memo(DiaryItem)
