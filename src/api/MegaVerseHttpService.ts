import axios, { AxiosStatic } from 'axios'
export enum AstralType {
	POLYANET = 'polyanets',
	SOLOON = 'soloons',
	COMETH = 'comeths',
}
export enum SoloonColor {
	'blue',
	'red',
	'purple',
	'white'
}
export enum ComethDirection {
	'up',
	'down',
	'right',
	'left'
}
export type CreateAstralPayload = {
	astralType: AstralType,
	row: number,
	column: number,
	additionalField?: string,
}
export type DeleteAstralPayload = {
	astralType: AstralType,
	row: number,
	column: number,
}

const BASE_URL = 'https://challenge.crossmint.io/api/'
const CANDIDATE_ID = 'de761a94-fb89-4897-a0ed-d8f7e6d3008b'

export const getAstralURL = (astralType: AstralType) =>
	`${BASE_URL}${astralType}?candidateId=${CANDIDATE_ID}`
export const getAdditionalFieldPayload =
	({ astralType,
		additionalField,
	}: {
		astralType: AstralType,
		additionalField?: string,
	}) => {
		switch (astralType) {
			case AstralType.POLYANET:
				return {}
			case AstralType.SOLOON:
				return { color: additionalField }
			case AstralType.COMETH:
				return { direction: additionalField }
		}
	}
export const createAstralObject =
	(
		{
			astralType,
			additionalField,
			...httpPayload
		}: CreateAstralPayload
	) => {
		const url = getAstralURL(astralType)
		const additionalFieldPayload = 
				getAdditionalFieldPayload({
				astralType,
				additionalField,
		})
		console.log({ url })
		return axios.post(url, {
			candidateId: CANDIDATE_ID,
			...additionalFieldPayload,
			...httpPayload
		})
	}

export const deleteAstralObject =
	(
		{
			astralType,
			row,
			column,
		}: DeleteAstralPayload
	) => {
		const url = `${getAstralURL(astralType)}?row=${row}&column=${column}`
		console.log({ url })
		return axios.delete(url)
	}

export const getGoalMap = () => {
	const url = `${BASE_URL}map/${CANDIDATE_ID}/goal`
	console.log({ url })
	return axios.get<{ goal: Array<Array<string>> }>(url)
}
