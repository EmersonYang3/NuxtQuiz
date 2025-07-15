export interface Quiz {
    title: string,
    description: string,
    subject_tags: Array<string>,
    difficulty: number,
    imageUrl: string
}

export interface ChipProps {
    text: string, 
    color: string
}