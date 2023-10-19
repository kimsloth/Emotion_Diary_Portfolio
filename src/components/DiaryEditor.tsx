import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DiaryDispatchContext } from "../App"
import { DiaryState } from "../types"
import { getStringDate } from "../util/date"
import { emotionList } from "../util/emotion"
import EmotionItem from "./EmotionItem"
import MyButton from "./MyButton"
import MyHeader from "./MyHeader"

interface DiaryEditorProps {
  isEdit?: boolean
  originData?: DiaryState
}

function DiaryEditor({ isEdit, originData }: DiaryEditorProps) {
  const navigate = useNavigate()
  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext)!

  const [date, setDate] = useState<string>(() => getStringDate(new Date()))
  const [emotion, setEmotion] = useState<number>(3)
  const [content, setContent] = useState<string>("")
  const contentRef = useRef<HTMLTextAreaElement>(null)

  const handleClickEmote = useCallback(
    (emotion_id: number) => setEmotion(emotion_id),
    []
  )

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current?.focus()
      return
    }

    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate({
          date: new Date(date).getTime(),
          content,
          emotion,
        })
      } else {
        onEdit({
          id: originData!.id,
          date: new Date(date).getTime(),
          content: content,
          emotion: emotion,
        })
      }
      navigate("/", { replace: true })
    }
  }

  const handleRemove = () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      onRemove(originData!.id)
      navigate("/", { replace: true })
    }
  }

  useEffect(() => {
    if (isEdit && originData) {
      setDate(getStringDate(new Date(originData.date)))
      setEmotion(originData.emotion)
      setContent(originData.content)
    }
  }, [isEdit, originData])

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={<MyButton text="< 뒤로가기" onClick={() => navigate(-1)} />}
        rightChild={
          isEdit && (
            <MyButton text="삭제하기" type="negative" onClick={handleRemove} />
          )
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((emotionItem) => (
              <EmotionItem
                key={emotionItem.emotion_id}
                emotion={emotionItem}
                isSelected={emotionItem.emotion_id === emotion}
                onClick={handleClickEmote}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="오늘은 어땠나요"
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <MyButton text="취소하기" onClick={() => navigate(-1)} />
            <MyButton text="작성완료" type="positive" onClick={handleSubmit} />
          </div>
        </section>
      </div>
    </div>
  )
}

export default DiaryEditor
