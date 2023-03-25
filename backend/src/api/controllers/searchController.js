import * as searchLogic from '../logic/searchLogic.js';

export async function search(req, res) {
	try {
		const { search } = req.params;
		const { page } = req.query;
		const result = await searchLogic.search(search, page);
		return res.json(result);
	} catch (error) {
		return res.status(error.status || 500).json(error.message);
	}
}