export interface Quiz {
    id: number

    title: string
    description: string
    subject_tags: Array<string>
    difficulty: number
    imageUrl: string
}

export interface Question {
    id: number

    quiz: number
    text: string
    subject_tags: Array<string>
    difficulty: number
    imageUrl: string
}

export interface Choice {
    id: number

    question: number
    text: string
    correct: boolean
}

export interface ChipProps {
    text: string, 
    color: string
}