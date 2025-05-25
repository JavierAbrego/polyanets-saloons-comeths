import { AxiosResponse, AxiosStatic } from "axios";
import { AstralType, createAstralObject, getGoalMap } from "./MegaVerseHttpService";
import { withRetrial } from "./utils";

const getAstralTypeFromCell = (cell: string): {
	astralType: AstralType,
	additionalField?: string,
} => {
	const splittedKey = cell.toUpperCase().split('_')
	const [astralKey, additionalField] =
		splittedKey.length > 1 ?
			[splittedKey[1], splittedKey[0].toLowerCase()] :
			[splittedKey[0], undefined]
	const astralType = AstralType[astralKey as keyof typeof AstralType]
	if (!astralType) {
		throw new Error('the key is not valid in AstralType')
	}
	return {
		astralType,
		additionalField
	}
}

const SPACE = 'SPACE'

export const solveGoal = async () => {
	const goalMapResponse = await getGoalMap()
	const goal = goalMapResponse.data.goal

	const buildQueue = () => {
		const queue: Array<() => Promise<AxiosResponse<any, any>>> = []
		const createCellIfNeeded = (x: number) =>
			async (cell: string, y: number) => {
				if (cell !== SPACE) {
					const {
						astralType,
						additionalField,
					} = getAstralTypeFromCell(cell)

					queue.push(
						() => createAstralObject({
							astralType,
							additionalField,
							row: x,
							column: y,
						})
					)
				}
			}
		goal.forEach((row, x) => row.forEach(createCellIfNeeded(x)))

		return queue
	}
	// execute the actions 
	for (const action of buildQueue()) {
		await withRetrial(action)
	}

}
