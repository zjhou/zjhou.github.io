import {arch} from './Utils';
function Content() {
    this.id = ''; 
    this.title= '';
    this.type = '';
    this.date = '';
}

function ContentTree() {
    this.data = '';
}

ContentTree.translate = function (contentArray) {
    let tree = new ContentTree();
    tree.data = arch(contentArray);
};

function Post() {
    this.id = '';
    this.type= '';
    this.title = '';
    this.content = '';
    this.date = '';
}

function Image() {
    this.title = '';
    this.type='image';
    this.description = '';
    this.url = '';
    this.id = '';
    this.date = '';
}

Content.translate = function (result) {
    let item = new Content();
    item.title = result.data.title[0].text;
    item.date = result.data.date;
    item.id = result.id;
    item.type = result.type;
    return item;
};

Image.translate = function (result) {
    let image = new Image();
    image.title = result.data.title[0].text;

    image.description = typeof result.data.description === 'string'
        ? result.data.description
        : result.data.description[0]['text'];

    image.url = result.data.content.url;
    image.id = result.id;
    image.date = result.data.date;
    return image;
};

Post.translate = function (results) {
    let post = new Post();
    post.id = results.id;
    post.type = results.type;
    post.title = results.data.title[0].text;
    post.date = results.data.date;
    post.content = results.data.content[0].text;
    return post;
};



export {Image, Content, Post};
