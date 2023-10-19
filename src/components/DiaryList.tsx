import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { DiaryState } from "../types"
import ControlMenu from "./ControlMenu"
import DiaryItem from "./DiaryItem"
import MyButton from "./MyButton"

interface DiaryListProps {
  diaryList: DiaryState[]
}

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
]

const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
]

function DiaryList({ diaryList }: DiaryListProps) {
  const navigate = useNavigate()

  const [sortType, setSortType] = useState<string>("latest")
  const [filter, setFilter] = useState<string>("all")

  const getProcessedDiaryList = () => {
    const filterCallBack = (item: DiaryState) => {
      if (filter === "bad") {
        return item.emotion <= 3
      } else {
        return item.emotion > 3
      }
    }

    const compare = (a: DiaryState, b: DiaryState) => {
      if (sortType === "latest") {
        return b.date - a.date
      } else {
        return a.date - b.date
      }
    }

    const copyList: DiaryState[] = JSON.parse(JSON.stringify(diaryList))

    const filteredList =
      filter === "all"
        ? copyList
        : copyList.filter((item) => filterCallBack(item))

    const sortedList = filteredList.sort(compare)
    return sortedList
  }

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            sortOptionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            sortOptionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            text="새 일기쓰기"
            type="positive"
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {getProcessedDiaryList().map((diary) => (
        <DiaryItem key={diary.id} diary={diary} />
      ))}
    </div>
  )
}

export default DiaryList
