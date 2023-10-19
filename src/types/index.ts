export interface DiaryState {
  id: number
  content: string
  emotion: number
  date: number
}

export interface ReqDiary extends Omit<DiaryState, "id"> {}

export interface Emotion {
  emotion_id: number
  emotion_img: string
  emotion_descrpit: string
}
