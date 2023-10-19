import { createContext, useEffect, useReducer, useRef } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"

import Home from "./pages/Home"
import New from "./pages/New"
import Edit from "./pages/Edit"
import Diary from "./pages/Diary"
import { DiaryState, ReqDiary } from "./types"

type InitType = {
  type: "INIT"
  data: DiaryState[]
}

type CreateType = {
  type: "CREATE"
  data: DiaryState
}

type RemoveType = {
  type: "REMOVE"
  targetId: number
}

type EditType = {
  type: "EDIT"
  data: DiaryState
}

type ActionType = InitType | CreateType | RemoveType | EditType

const reducer = (state: DiaryState[], action: ActionType): DiaryState[] => {
  let newState: DiaryState[] = []

  switch (action.type) {
    case "INIT":
      return action.data
    case "CREATE": {
      newState = [action.data, ...state]
      break
    }
    case "REMOVE": {
      newState = state.filter((it: DiaryState) => it.id !== action.targetId)
      break
    }
    case "EDIT": {
      newState = state.map((it: DiaryState) =>
        it.id === action.data.id ? { ...action.data } : it
      )
      break
    }
    default:
      return state
  }

  localStorage.setItem("diary", JSON.stringify(newState))
  return newState
}

export const DiaryStateContext = createContext<DiaryState[]>([])

export const DiaryDispatchContext = createContext<{
  onCreate: ({ date, content, emotion }: ReqDiary) => void
  onRemove: (targetId: number) => void
  onEdit: ({ id, date, content, emotion }: DiaryState) => void
} | null>(null)

function App() {
  const [data, dispatch] = useReducer(reducer, [])
  const dataId = useRef<number>(0)

  // CREATE
  const onCreate = ({ date, content, emotion }: ReqDiary) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current++,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    })
  }

  // REMOVE
  const onRemove = (targetId: number) => {
    dispatch({
      type: "REMOVE",
      targetId,
    })
  }

  // EDIT
  const onEdit = ({ id, date, content, emotion }: DiaryState) => {
    dispatch({
      type: "EDIT",
      data: {
        id,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    })
  }

  useEffect(() => {
    const localData = localStorage.getItem("diary")

    if (localData) {
      const diaryList: DiaryState[] = JSON.parse(localData)
      if (Array.isArray(diaryList) && diaryList.length > 0) {
        diaryList.sort((a: DiaryState, b: DiaryState) => b.id - a.id)
        dataId.current = diaryList[0].id + 1

        dispatch({
          type: "INIT",
          data: diaryList,
        })
      }
    }
  }, [])

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onEdit,
          onRemove,
        }}
      >
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  )
}

export default App
