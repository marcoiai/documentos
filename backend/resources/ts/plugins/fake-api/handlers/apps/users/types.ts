export interface Profile {
  id: string
  avatar: string
  name: string
  time: string
}

export interface PostImage {
  img: string
  featured?: boolean
  title?: string
}

export interface Likes {
  like: boolean
  value: number
}

export interface Group {
  id: string
  avatar: string
  name: string
}

export interface Reply {
  id: string
  profile: Profile
  data: CommentData
}

export interface CommentData {
  name?: string
  comment?: string
  likes?: Likes
  video?: string
  replies?: Reply[]
}

export interface PostData {
  id?: string
  content: string
  images: PostImage[]
  video?: string
  likes: Likes
  comments?: Comment[]
}
export interface Comment {
  id: string
  profile: Profile
  data?: CommentData
}
export interface Post {
  id?: string
  profile: Profile
  data: PostData
}
