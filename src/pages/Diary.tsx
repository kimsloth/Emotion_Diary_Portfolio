import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { DiaryStateContext } from "../App"
import MyButton from "../components/MyButton"
import MyHeader from "../components/MyHeader"
import { DiaryState } from "../types"
import { getStringDate } from "../util/date"
import { emotionList } from "../util/emotion"

function Diary() {
  const navigate = useNavigate()
  const { id } = useParams()
  const diaryList = useContext(DiaryStateContext)

  const [data, setData] = useState<DiaryState>()

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find((diary) => diary.id === parseInt(id!))

      if (targetDiary) {
        setData(targetDiary)
      } else {
        alert("없는 일기입니다.")
        navigate("/", { replace: true })
      }
    }
  }, [diaryList, id, navigate])

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0]
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기`
  }, [id])

  if (!data) {
    return <div className="DiaryPage">로딩중입니다...</div>
  }

  const curEmotionData = emotionList.find(
    (emotion) => emotion.emotion_id === data.emotion
  )

  return (
    <div className="DiaryPage">
      <MyHeader
        headText={`${getStringDate(new Date(data.date))} 기록`}
        leftChild={<MyButton text="< 뒤로가기" onClick={() => navigate(-1)} />}
        rightChild={
          <MyButton text="수정하기" onClick={() => navigate(`/edit/${id}`)} />
        }
      />
      <article>
        <section>
          <h4>오늘의 감정</h4>
          <div
            className={[
              "diary_img_wrapper",
              `diary_img_wrapper_${data.emotion}`,
            ].join(" ")}
          >
            <img
              src={curEmotionData?.emotion_img}
              alt={`감정 ${curEmotionData?.emotion_descrpit} 이미지`}
            />
            <div className="emotion_descript">
              {curEmotionData?.emotion_descrpit}
            </div>
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="diary_content_wrapper">
            <p>{data.content}</p>
          </div>
        </section>
      </article>
    </div>
  )
}

export default Diary
