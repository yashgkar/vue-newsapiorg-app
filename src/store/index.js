import { createStore } from 'vuex'

export default createStore({
	state() {
		return {
			articles: [],
			oldArticles: [],
			totalArticleResults: null,
			totalOldResults: null,
			currentPage: 1,
			isLoading: false,
			searchText: '',
			country: 'us',
			category: 'general',
			error: null
		}
	},
	actions: {
		async search(ctx) {
			if (ctx.getters.searchText !== '') {
				await ctx.dispatch('getResultByPage', {
					page: ctx.getters.currentPage
				})
				return
			}
			ctx.commit('setArticles', ctx.getters.oldArticles)
		},
		async getResultByPage(ctx, payload) {
			const page = payload.page
			const type = ctx.state.searchText === '' ? 'top-headlines' : 'everything'
			const paramsObj = {
				apiKey: process.env.VUE_APP_NEWSAPIKEY,
				q: ctx.getters.searchText,
				sortBy: 'publishedAt'
			}
			if (payload.page !== 0) {
				paramsObj.page = payload.page
			}
			if (type === 'everything') {
				delete paramsObj.country
			}
			if (type === 'top-headlines') {
				delete paramsObj.q
				paramsObj.country = ctx.getters.country
				paramsObj.category = ctx.getters.category
			}
			const params = new URLSearchParams(paramsObj)
			const urlStrings = [`https://newsapi.org/v2/${type}?`, params.toString()]
			const url = urlStrings.join('')
			ctx.commit('setLoading', true)
			fetch(url)
				.then(async (res) => {
					if (res.ok) {
						const data = await res.json()
						ctx.commit('setArticles', data)
						ctx.commit('setLoading', false)
						if (payload.page === 0) {
							ctx.commit('setOldArticles', data)
							ctx.commit('setPageNumber', 1)
							return
						}
						ctx.commit('setPageNumber', page)
						return
					}
					const err = await res.json()
					ctx.dispatch('setError', err)
				})
		},
		setSearchText(ctx, payload) {
			ctx.commit('setSearchText', payload)
		},
		setCountry(ctx, payload) {
			ctx.commit('setCountry', payload)
		},
		getSingleArticle(ctx, articleId) {
			const article = ctx.getters.articles.find((item) => item.id === articleId)
			return article
		},
		setCategory(ctx, payload) {
			ctx.commit('setCategory', payload)
		},
		setError(ctx, payload) {
			ctx.commit('setError', payload)
		}
	},
	getters: {
		totalResults(state) {
			return state.totalArticleResults
		},
		articles(state) {
			return state.articles
		},
		oldArticles(state) {
			return {
				articles: state.oldArticles,
				totalResults: state.totalOldResults
			}
		},
		totalPages(state) {
			return Math.ceil(state.totalArticleResults / 20)
		},
		currentPage(state) {
			return state.currentPage
		},
		isLoading(state) {
			return state.isLoading
		},
		searchText(state) {
			return state.searchText
		},
		country(state) {
			return state.country
		},
		category(state) {
			return state.category
		},
		error(state) {
			return state.error
		}
	},
	mutations: {
		setArticles(state, payload) {
			const articles = payload.articles.map((item) => {
				return {
					...item,
					id: Math.random()
						.toString()
						.substring(2)
				}
			})
			state.articles = articles
			state.totalArticleResults = payload.totalResults
		},
		setOldArticles(state, payload) {
			const articles = payload.articles.map((item) => {
				return {
					...item,
					id: Math.random()
						.toString()
						.substring(2)
				}
			})
			state.oldArticles = articles
			state.totalOldResults = payload.totalResults
		},
		setPageNumber(state, payload) {
			state.currentPage = payload
		},
		setLoading(state, payload) {
			state.isLoading = payload
		},
		setSearchText(state, payload) {
			state.searchText = payload
		},
		setCountry(state, payload) {
			state.country = payload
		},
		setCategory(state, payload) {
			state.category = payload
		},
		setError(state, payload) {
			state.error = payload
		}
	}
})
