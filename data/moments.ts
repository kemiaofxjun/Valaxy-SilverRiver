export interface MomentItem {
  id: string
  author?: {
    name: string
    avatar: string
    badges?: string[]
  }
  content: string
  images?: string[]
  location?: string
  createdAt: string        // yyyy-MM-dd HH:mm
}

const moments: MomentItem[] = [
  {
    id: '1',
    content: '测试',
    location: '南京市',
    createdAt: '2025-09-11 12:30',
  },
  {
    id: '2',
    content: '测试图片',
    images: ['https://imgbed.kemeow.top/file/pLwwWj8Y.jpg'],
    location: '南京市',
    createdAt: '2025-09-11 14:46',
  },
]

/* 导出已排好序的数据，组件里直接引入 */
export default moments.sort((a, b) =>
  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())