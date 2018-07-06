import Prismic from 'prismic-javascript';
import localforage from 'localforage';
import {Content, Image, Post, RichPost} from './Dto';

const apiEndpoint = 'https://zjhoucom.prismic.io/api/v2';
const blog = {
    content: {
        queryFun: api => api.query(''),
        dto: Content
    },
    rich_text_post: {
        queryFun: function (api) {
            return api.query(
                Prismic.Predicates.at('document.type', 'rich_text_post')
            );
        },
        dto: RichPost
    },
    blog_post: {
        queryFun: function (api) {
            return api.query(
                Prismic.Predicates.at('document.type', 'blog_post')
            );
        },
        dto: Post
    },
    love_letter: {
        queryFun: function (api) {
            return api.query(
                Prismic.Predicates.at('document.type', 'love_letter')
            );
        },
        dto: Post
    },
    image: {
        queryFun: function (api) {
            return api.query(
                Prismic.Predicates.at('document.type', 'image')
            );
        },
        dto: Image
    },
};

const queryAPI = function (queryFun, dto) {
    return Prismic
        .getApi(apiEndpoint, {})
        .then(queryFun)
        .then(function (response) {
            if(!window.cache.results){
                window.cache.results = response.results;
                try {
                    window.cache.titles = response.results.map(r => r.data.title[0].text);
                } catch (e) {
                    window.cache.titles = [];
                }
                localforage.setItem('cache', window.cache);
            }
            return Promise.resolve((response.results.map(dto.translate)));
        }, function (err) {
            return Promise.reject(err);
        });
};

const getContent = (content) => {
    let target = window.cache.results.filter(c => c.id === content.id);
    if(target.length > 0) {
        return Promise.resolve(target.map(blog[content.type].dto.translate));
    }
    return queryAPI(api => api.getByIDs([content.id]), blog[content.type].dto);
};

const getAllPosts = () => {
    return queryAPI(blog.blog_post.queryFun, blog.blog_post.dto);
};

const getAllImages = () => {
    return queryAPI(blog.image.queryFun, blog.image.dto);
};

const getAllContent = (searchTextParam) => {
    if(window.cache.results && !searchTextParam)
        return Promise.resolve(window.cache.results.map(Content.translate));
    return queryAPI(api => api.query(
        searchTextParam
            ? [Prismic.Predicates.fulltext('document', searchTextParam)]
            : '',
        {
            orderings: '[document.first_publication_date desc]',
            pageSize: 100
        }), Content);
};

export {getAllPosts, getAllImages, getAllContent, getContent};
