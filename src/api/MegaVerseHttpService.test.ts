import { describe, it, expect } from 'vitest';
import {
	AstralType,
	createAstralObject,
	deleteAstralObject,
	getGoalMap
} from './MegaVerseHttpService';

describe('Astral API Integration Tests', () => {
	it('should create polyanet, get the goal map and delete it', async () => {
		try {
			const createResponse = await createAstralObject({
				astralType: AstralType.POLYANET,
				row: 1,
				column: 1,
			});
			expect(createResponse.status).toBe(200)
			console.log(JSON.stringify(createResponse, null, '\t'))
		} catch (e) {
			console.log(JSON.stringify(e))
		}



		console.log('should retrieve the goal map')
		const getGoalMapResponse = await getGoalMap()
		expect(getGoalMapResponse.status).toBe(200)
		console.log(JSON.stringify(getGoalMapResponse.data, null, '\t'))


		console.log('should delete polyanet')
		const deleteResponse = await deleteAstralObject({
			astralType: AstralType.POLYANET,
			row: 1,
			column: 1,
		});
		expect(deleteResponse.status).toBe(200)
		console.log(JSON.stringify(deleteResponse.data, null, '\t'))
	})
})

