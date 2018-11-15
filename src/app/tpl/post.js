const title = ({title, _id}) =>
    `<span class="command" data-cmd="cat ${title}" data-id="${_id}">${title}</span>`;

export {title};