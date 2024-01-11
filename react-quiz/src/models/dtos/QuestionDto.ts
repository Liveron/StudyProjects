export default class QuestionDto {
  constructor(
    public readonly id: number,
    public readonly question: string,
    public readonly options: string[],
    public readonly correctOption: number,
    public readonly points: number
  ) {}
}
