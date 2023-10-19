import { useContext, useEffect, useState } from "react"
import { DiaryStateContext } from "../App"
import DiaryList from "../components/DiaryList"
import MyButton from "../components/MyButton"
import MyHeader from "../components/MyHeader"
import { DiaryState } from "../types"

function Home() {
  const diaryList = useContext(DiaryStateContext)

  const [data, setData] = useState<DiaryState[]>([])
  const [curDate, setCurDate] = useState(new Date())
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime()

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime()

      setData(
        diaryList.filter(
          (diary) => firstDay <= diary.date && diary.date <= lastDay
        )
      )
    }
  }, [curDate, diaryList])

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0]
    titleElement.innerHTML = `감정 일기장`
  }, [])

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    )
  }

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    )
  }

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text="<" onClick={decreaseMonth} />}
        rightChild={<MyButton text=">" onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  )
}

export default Home
