const contentT = (contents) => {
    let contSpan = (content) => `
            <span 
                data-type=${content.type}
                data-id=${content.id}
                class="${content.type} title"
            >${content.title}</span>`;

    return `<div class="title-list">${contents.map(contSpan).join("")}</div>`
};

const postT = (post) => `
    <div class="post">
        <pre>${post.content}</pre>
        <!--<time>${post.date}</time>-->
    </div>
`;

const imageT = (image) => `
    <div class="image">
        <pre>${image.description || ""}\n-</pre>
        <time>${image.date}</time>
    </div>
`;

const ErrorT = (error) => `<span>${error}</span>`;
export {contentT, postT, imageT, ErrorT}